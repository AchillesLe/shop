﻿using shop_api.DTO;
using shop_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace shop_api.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private ShopApiModel context = new ShopApiModel();
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

        [HttpGet(), Route("add")]
        public IHttpActionResult Add([FromBody] ProductDTO pro)
        {
            try
            {
                var pro_entity = new Product();
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                pro_entity.avatar = pro.avatar;
                pro_entity.images = pro.images;
                pro_entity.idCategory = pro.idCategory;

                pro_entity.idCreator = pro.idCreator;
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
            catch (Exception e) { return BadRequest("Insert Error" + e.Message); }
        }
        [HttpPut, Route("edit/{id_pro}")]
        public IHttpActionResult Edit(int id_pro,[FromBody] ProductDTO pro)
        {
            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest("Product Not Found");
            }
            try
            {
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                pro_entity.avatar = pro.avatar;
                pro_entity.images = pro.images;
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
            catch (Exception e) { return BadRequest("Update Error" + e.Message); }
        }
        [HttpPut, Route("delete/{id_pro}")]
        public IHttpActionResult Delete(int id_pro)
        {
            var pro_entity = context.Products.Where(x => x.idProduct == id_pro).FirstOrDefault();
            if (pro_entity == null)
            {
                return BadRequest("Product Not Found");
            }
            try
            {
                context.Products.Remove(pro_entity);
                context.SaveChanges();
                return Ok("Delete Completed");
            }
            catch (Exception e) { return BadRequest("Delete Error" + e.Message); }
        }





    }
}
