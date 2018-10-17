using shop_api.DTO;
using shop_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.Service
{
    public class ProductService
    {
        private ShopApiModel context = new ShopApiModel();
        public List<ProductDTO> getAll()
        {
            List<ProductDTO> listpros = new List<ProductDTO>();
            try
            {
                listpros = context.Products.Select(x => new ProductDTO
                {
                    idProduct = x.idProduct,
                    name = x.name,
                    code = x.code,
                    avatar = x.avatar,
                    images = x.images,
                    idCategory = x.idCategory,
                    categoryName = x.Category.name,
                    idCreator = x.idCreator,
                    creatorName = x.User.fullname,
                    width = x.width,
                    high = x.high,
                    price = x.price,
                    madein = x.madein,
                    length = x.length,
                    quantity = x.quantity,
                    isDelete = x.isDelete,
                    createdDate = x.createdDate,
                    updatedDate = x.updatedDate
                }).ToList();
                return listpros;
            }
            catch (Exception ex)
            {
                return listpros;
            }
        }
        public ProductDTO getById(int id)
        {
            ProductDTO pro = new ProductDTO();
            try
            {
                pro = context.Products.Where(x => x.idProduct == id).Select(x => new ProductDTO
                {
                    idProduct = x.idProduct,
                    name = x.name,
                    code = x.code,
                    avatar = x.avatar,
                    images = x.images,
                    idCategory = x.idCategory,
                    categoryName = x.Category.name,
                    idCreator = x.idCreator,
                    creatorName = x.User.fullname,
                    width = x.width,
                    high = x.high,
                    price = x.price,
                    madein = x.madein,
                    length = x.length,
                    quantity = x.quantity,
                    isDelete = x.isDelete,
                    createdDate = x.createdDate,
                    updatedDate = x.updatedDate
                }).FirstOrDefault();
                return pro;

            }
            catch (Exception ex)
            {
                return pro;
            }
        }
        public ProductDTO create(Product product)
        {
            try
            {
                context.Products.Add(product);
                context.SaveChanges();
                ProductDTO added_product = context.Products.Where(x => x.idProduct == product.idProduct)
                      .Select(x => new ProductDTO
                      {
                          idProduct = x.idProduct,
                          name = x.name,
                          code = x.code,
                          avatar = x.avatar,
                          images = x.images,
                          idCategory = x.idCategory,
                          categoryName = x.Category.name,
                          idCreator = x.idCreator,
                          creatorName = x.User.fullname,
                          width = x.width,
                          high = x.high,
                          price = x.price,
                          madein = x.madein,
                          length = x.length,
                          quantity = x.quantity,
                          isDelete = x.isDelete,
                          createdDate = x.createdDate,
                          updatedDate = x.updatedDate
                      }).FirstOrDefault();
                return added_product;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public ProductDTO edit(Product product)
        {
            try
            {
                context.Products.Attach(product);
                context.Entry(product).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
                ProductDTO modified_product = context.Products.Where(x => x.idProduct == product.idProduct)
                     .Select(x => new ProductDTO
                     {
                         idProduct = x.idProduct,
                         name = x.name,
                         code = x.code,
                         avatar = x.avatar,
                         images = x.images,
                         idCategory = x.idCategory,
                         categoryName = x.Category.name,
                         idCreator = x.idCreator,
                         creatorName = x.User.fullname,
                         width = x.width,
                         high = x.high,
                         price = x.price,
                         madein = x.madein,
                         length = x.length,
                         quantity = x.quantity,
                         isDelete = x.isDelete,
                         createdDate = x.createdDate,
                         updatedDate = x.updatedDate
                     }).FirstOrDefault();
                return modified_product;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public bool delete(int id)
        {
            try
            {
                var pro = context.Products.Where(x => x.idProduct == id).FirstOrDefault();
                if (pro != null)
                {
                    pro.isDelete = 1;
                    context.Products.Attach(pro);
                    context.Entry(pro).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}