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
        ProductService productService = new ProductService();
        [HttpGet(), Route("get/page/{page?}")]
        public IHttpActionResult GetList(int? page = null)
        {
            var listproduct = productService.getAll(page);
            int totalpage = productService.TotalPage;
            return Ok(new { total = totalpage, requestPage = page, list = listproduct });
        }

        [HttpGet(), Route("getdetails/{id_product}")]
        public Object Get(int id_product)
        {
            var product = productService.getById(id_product);
            return product;
        }

        [HttpPost(), Route("add")]
        public IHttpActionResult Add([FromBody] ProductDTO pro)
        {
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if(token == String.Empty)
            {
                return BadRequest(Message.messageNotValidToken);
            }

            try
            {
                UserDTO logged_user = new UserDTO();
                logged_user = userService.getUserByToken(token);
               
                var pro_entity = new Product();
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                pro_entity.avatar = pro.avatar;
                pro_entity.images = pro.images;
                pro_entity.idCategory = pro.idCategory;
                pro_entity.idCreator = logged_user.iduser;
                pro_entity.width = pro.width;
                pro_entity.high = pro.high;
                pro_entity.priceIn = pro.priceIn;
                pro_entity.priceOut = pro.priceOut;
                pro_entity.madein = pro.madein;
                pro_entity.length = pro.length;
                pro_entity.quantity = pro.quantity;
                pro_entity.description = pro.description;
                pro_entity.isDelete = 0;
                pro_entity.createdDate = DateTime.Now;
                pro_entity.updatedDate = DateTime.Now;

                var newPro = productService.create(pro_entity);
                if (newPro!= null)
                {
                    return Ok(newPro);
                }
                return Ok(Message.messageInsertFailed);
            }
            catch (Exception e) { return InternalServerError(); }
        }
        [HttpPut, Route("update/{id_pro}")]
        public IHttpActionResult Edit(int id_pro,[FromBody] ProductDTO pro)
        {

            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest(Message.messageNotFound);
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest(Message.messageNotValidToken);
            }
            UserDTO logged_user = new UserDTO();
            logged_user = userService.getUserByToken(token);
            try
            {
                pro.idProduct = id_pro;
                pro.idCreator = logged_user.iduser;
                var updated_product = productService.edit(pro);
                if (updated_product != null)
                {
                    return Ok(updated_product);
                }
                return Ok(Message.messageUpdateFailed);
            }
            catch (Exception e) { return InternalServerError(); }
        }
        [HttpDelete, Route("delete/{id_pro}")]
        public IHttpActionResult Delete(int id_pro)
        {
            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest(Message.messageNotFound);
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest(Message.messageNotValidToken);
            }
            try
            {
                if (pro_entity != null)
                {
                    if (productService.delete(id_pro))
                    {
                        return Ok(Message.messageDeleteSuccessfully);
                    }
                }
                return BadRequest();
            }
            catch (Exception e) { return InternalServerError(); }
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

