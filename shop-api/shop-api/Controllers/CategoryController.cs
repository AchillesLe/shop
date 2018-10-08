using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.Models;
using shop_api.DTO;

namespace shop_api.Controllers
{
    [RoutePrefix("api/category")]
    public class CategoryController : ApiController
    {
        private ShopApiModel context = new ShopApiModel();
        [HttpGet(),Route("getall")]
        public List<Category> getALL()
        {
            return context.Categories.ToList();
        }
        [HttpPost,Route("add")]
        public IHttpActionResult Add([FromBody] CategoryDTO cat)
        {
            try
            {
                var db = new ShopApiModel();
                var cat_entity = new Category();
                //cat_entity.name = cat.name;
                cat_entity.isDelete = 0;
                cat_entity.createdDate = DateTime.Now;
                cat_entity.updatedDate = DateTime.Now;
                db.Categories.Add(cat_entity);
                db.SaveChanges();
                return Ok("Insert Complete");
            }
            catch (Exception e) { return BadRequest("Insert Error" + e.Message); }
        }
    }
}
