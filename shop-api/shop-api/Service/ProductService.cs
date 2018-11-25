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
        public int Pagination = 9;
        public int TotalPage = 0;
        public ProductService()
        {
            TotalPage = TotalPageCount();
        }
        public List<ProductDTO> getAll(int? page = null)
        {
            int? skipRows = (page - 1) * Pagination;
            List<ProductDTO> listpros = new List<ProductDTO>();
            try
            {
                if (page != null)
                {
                    listpros = context.Products.Where(x => x.isDelete == 0).OrderBy(x => x.idProduct).Skip((int)skipRows).Take(9).Select(x => new ProductDTO
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
                        priceIn = x.priceIn,
                        priceOut = x.priceOut,
                        madein = x.madein,
                        length = x.length,
                        quantity = x.quantity,
                        isDelete = x.isDelete,
                        createdDate = x.createdDate,
                        updatedDate = x.updatedDate
                    }).ToList();
                }
                else
                {
                    listpros = context.Products.Where(x => x.isDelete == 0).OrderBy(x => x.idProduct).Select(x => new ProductDTO 
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
                        priceIn = x.priceIn,
                        priceOut = x.priceOut,
                        madein = x.madein,
                        length = x.length,
                        quantity = x.quantity,
                        isDelete = x.isDelete,
                        createdDate = x.createdDate,
                        updatedDate = x.updatedDate
                    }).ToList();
                }
                
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
                    priceIn = x.priceIn,
                    priceOut = x.priceOut,
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
                          priceIn = x.priceIn,
                          priceOut = x.priceOut,
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
        public ProductDTO edit(ProductDTO pro)
        {
            try
            {
                var pro_entity = context.Products.Where(x => x.idProduct == pro.idProduct).FirstOrDefault();
                pro_entity.name = pro.name;
                pro_entity.code = pro.code;
                pro_entity.avatar = pro.avatar;
                pro_entity.images = pro.images;
                pro_entity.idCategory = pro.idCategory;
                pro_entity.idCreator = pro.idCreator;
                pro_entity.width = pro.width;
                pro_entity.priceIn = pro.priceIn;
                pro_entity.priceOut = pro.priceOut;
                pro_entity.madein = pro.madein;
                pro_entity.length = pro.length;
                pro_entity.quantity = pro.quantity;
                pro_entity.isDelete = 0;
                pro_entity.idCreator = pro.idCreator;
                pro_entity.updatedDate = DateTime.Now;
                context.Products.Attach(pro_entity);
                context.Entry(pro_entity).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
                ProductDTO modified_product = context.Products.Where(x => x.idProduct == pro.idProduct)
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
                         priceIn = x.priceIn,
                         priceOut = x.priceOut,
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

        private int TotalPageCount()
        {
            int total = 0;
            int totalRow = context.Products.Where(x => x.isDelete == 0).Count();
            total = (totalRow + Pagination - 1) / Pagination;
            return total;
        }
    }
}