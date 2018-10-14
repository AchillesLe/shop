using shop_api.DTO;
using shop_api.Models;
using shop_api.Service;
using shop_api.Utility;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace shop_api.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private ShopApiModel context = new ShopApiModel();
        UserService userService = new UserService();
        [HttpGet(), Route("getall")]
        public Object Get()
        {
            var lstProducts = context.Products.Select(x => new
            {
                id = x.idProduct,
                name = x.name,
                code = x.code,
                avatar = x.avatar,
                images = x.images,
                categoryID = x.idCategory,
                categoryName = x.Category.name,
                creatorID = x.idCreator,
                creatorName = x.User.fullname,
                width = x.width,
                height = x.high,
                price = x.price,
                madeIn = x.madein,
                length = x.length,
                quantity = x.quantity,
                isDelete = x.isDelete,
                createdDate = x.createdDate,
                updateDate = x.updatedDate
            });
            return lstProducts.ToList();
        }

        [HttpGet(), Route("getdetails/{id_product}")]
        public Object Get(int id_product)
        {
            var pro = context.Products.Select(x => new
            {
                id = x.idProduct,
                name = x.name,
                code = x.code,
                avatar = x.avatar,
                images = x.images,
                categoryID = x.idCategory,
                categoryName = x.Category.name,
                creatorID = x.idCreator,
                creatorName = x.User.fullname,
                width = x.width,
                height = x.high,
                price = x.price,
                madeIn = x.madein,
                length = x.length,
                quantity = x.quantity,
                isDelete = x.isDelete,
                createdDate = x.createdDate,
                updateDate = x.updatedDate
            }).Where(x => x.id == id_product).FirstOrDefault();

            if (pro == null)
            {
                return BadRequest("Product Not Found");
            }
            return pro;
        }

        [HttpPost(), Route("add")]
        public IHttpActionResult Add([FromBody] ProductDTO pro)
        {
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if(token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }

            try
            {
                UserDTO logged_user = new UserDTO();
                logged_user = userService.getUserByToken(token);
                //// Get the uploaded image from the Files collection
                //var httpPostedFile = HttpContext.Current.Request.Files["avatar"];

                //if (httpPostedFile != null)
                //{
                //    // Validate the uploaded image(optional)

                //    // Get the complete file path
                //    var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/UploadedFiles"), httpPostedFile.FileName);

                //    // Save the uploaded file to "UploadedFiles" folder
                //    httpPostedFile.SaveAs(fileSavePath);
                //}


                var pro_entity = new Product();
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                //pro_entity.avatar = pro.avatar;
                //pro_entity.images = pro.images;
                pro_entity.idCategory = pro.idCategory;
                pro_entity.idCreator = logged_user.iduser;
                pro_entity.width = pro.width;
                pro_entity.high = pro.high;
                pro_entity.price = pro.price;
                pro_entity.madein = pro.madein;
                pro_entity.length = pro.length;
                pro_entity.quantity = pro.quantity;
                pro_entity.isDelete = 0;
                pro_entity.createdDate = DateTime.Now;
                pro_entity.updatedDate = DateTime.Now;

                context.Products.Add(pro_entity);
                context.SaveChanges();
                return Ok("Insert Complete");
            }
            catch (Exception e) { return BadRequest("Insert Error" + e.GetBaseException()); }
        }
        [HttpPut, Route("edit/{id_pro}")]
        public IHttpActionResult Edit(int id_pro,[FromBody] ProductDTO pro)
        {

            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest("Product Not Found");
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }
            try
            {
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                //pro_entity.avatar = pro.avatar;
                //pro_entity.images = pro.images;
                pro_entity.idCategory = pro.idCategory;

                pro_entity.idCreator = pro.idCreator;
                pro_entity.width = pro.width;
                pro_entity.high = pro.high;
                pro_entity.price = pro.price;
                pro_entity.madein = pro.madein;
                pro_entity.length = pro.length;
                pro_entity.quantity = pro.quantity;
                pro_entity.isDelete = 0;
                pro_entity.updatedDate = DateTime.Now;

                context.SaveChanges();
                return Ok("Update Completed");
            }
            catch (Exception e) { return BadRequest("Update Error" +e.GetBaseException() ); }
        }
        [HttpDelete, Route("delete/{id_pro}")]
        public IHttpActionResult Delete(int id_pro)
        {
            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest("Product Not Found");
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }
            try
            {
                context.Products.Remove(pro_entity);
                context.SaveChanges();
                return Ok("Delete Completed");
            }
            catch (Exception e) { return BadRequest("Delete Error" +e.GetBaseException()); }
        }
        [HttpPost(), Route("upload")]
        public async Task<HttpResponseMessage> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string fileSaveLocation = HttpContext.Current.Server.MapPath("~/App_Data");
            CustomMultipartFormDataStreamProvider provider = new CustomMultipartFormDataStreamProvider(fileSaveLocation);
            List<string> files = new List<string>();
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
                foreach (MultipartFileData file in provider.FileData)
                {
                    string now = DateTime.Now.ToString("ddMMyyyyhhmmss");
                    string fileName = "File_" + now;
                    string nameFilePlod = Path.GetFileName(file.LocalFileName);
                    string newNameFile =  fileName + getNameTypeExtend(nameFilePlod);
                    System.IO.File.Move(file.LocalFileName, fileSaveLocation + "\\" + newNameFile);
                    files.Add(newNameFile);
                }
                return Request.CreateResponse(HttpStatusCode.OK, files);
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }
        private string getNameTypeExtend(string name)
        {
            string ext = "";
            for(int i = name.Length-1; i > 0; i--)
            {
                if (name[i].Equals('.'))
                {
                    ext  = name.Substring(i);
                    break;
                }
            }
            return ext;
        }
    }

}

