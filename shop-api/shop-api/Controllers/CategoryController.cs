using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.Models;

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
    }
}
