using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.Models;
using shop_api.DTO;
using shop_api.Service;
using shop_api.Utility;

namespace shop_api.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        private ShopApiModel context = new ShopApiModel();
        private CategoryService cateService = new CategoryService();
        [HttpGet(),Route("getall")]
        public Object getALL()
        {
            //var lstCats = context.Categories.Select(x => new
            //{
            //    ID = x.idCategory,
            //    Name = x.name,
            //    isDelete = x.isDelete,
            //    createdDate = x.createdDate,
            //    updateDate = x.updatedDate
            //});
            //return lstCats.ToList();
            string token = Token.HandleToken(Request);
            if (token == string.Empty)
            {
                return BadRequest(Message.messageNotValidToken);
            }
            var listcate = cateService.getAll();
            return listcate;
        }
        [HttpGet(), Route("getdetails/{id_cat}")]
        public Object getSingle(int id_cat)
        {
            //var cat_entity = context.Categories.Where(x => x.idCategory == id_cat).FirstOrDefault();
            //if (cat_entity == null)
            //{
            //    return BadRequest("Category Not Found");
            //}
            //var cat = context.Categories.Where(x => x.idCategory == id_cat).Select(x => new
            //{
            //    ID = x.idCategory,
            //    Name = x.name,
            //    isDelete = x.isDelete,
            //    createdDate = x.createdDate,
            //    updateDate = x.updatedDate
            //});
            //return cat;
            string token = Token.HandleToken(Request);
            if (token == string.Empty)
            {
                return BadRequest(Message.messageNotValidToken);
            }
            var listcate = cateService.getById(id_cat);
            return listcate;
        }

        [HttpPost,Route("add")]
        public IHttpActionResult Add([FromBody] CategoryDTO cat)
        {
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }
            try
            {
                var cat_entity = new Category();
                cat_entity.name = cat.name;
                cat_entity.isDelete = 0;
                cat_entity.createdDate = DateTime.Now;
                cat_entity.updatedDate = DateTime.Now;
                var newCate = cateService.create(cat_entity);
                if (newCate!=null)
                {
                    return Ok(newCate);
                }
                //context.Categories.Add(cat_entity);
                //context.SaveChanges();
                return Ok(Message.messageInsertFailed);
            }
            catch (Exception e) { return BadRequest("Insert Error" + e.Message); }
        }

        [HttpPut, Route("edit/{id_cat}")]
        public IHttpActionResult Edit(int id_cat,[FromBody] CategoryDTO cat)
        {
            var cat_entity = context.Categories.Where(x => x.idCategory == id_cat).FirstOrDefault();
            if(cat_entity == null)
            {
                return BadRequest("Category Not Found");
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }
            try
            {
                cat_entity.name = cat.name;
                cat_entity.updatedDate = DateTime.Now;
                context.SaveChanges();
                return Ok("Update Completed");
            }
            catch (Exception e) { return BadRequest("Insert Error" + e.Message); }
        }
        [HttpDelete, Route("delete/{id_cat}")]
        public IHttpActionResult Delete(int id_cat)
        {
            var cat_entity = context.Categories.Where(x => x.idCategory == id_cat).FirstOrDefault();
            if (cat_entity == null)
            {
                return BadRequest("Category Not Found");
            }
            var headers = Request.Headers;
            string token = Token.HandleToken(Request);
            if (token == String.Empty)
            {
                return BadRequest("You need to store token in header");
            }
            try
            {
                context.Categories.Remove(cat_entity);
                context.SaveChanges();
                return Ok("Delete Completed");
            }
            catch (Exception e) { return BadRequest("Insert Error" + e.Message); }
        }
    }
}
