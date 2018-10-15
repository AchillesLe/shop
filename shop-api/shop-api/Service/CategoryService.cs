using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.DTO;
using shop_api.Models;
using shop_api.Utility;
namespace shop_api.Service
{
    public class CategoryService
    {
        private ShopApiModel context = new ShopApiModel();

        public List<CategoryDTO> getAll()
        {
            List<CategoryDTO> listcates = new List<CategoryDTO>();
            try
            {
                listcates = context.Categories
                       .Select(x => new CategoryDTO
                       {
                           idCategory = x.idCategory,
                           name = x.name,
                           createdDate = x.createdDate,
                           updatedDate = x.updatedDate,
                           isDelete = x.isDelete
                           //products = context.Products.Where(a=>a.idCategory == x.idCategory).Select(a=>new ProductDTO {
                           //    idProduct = a.idProduct,
                           //    name = a.name,
                           //    code = a.code,
                           //    avatar = a.avatar,
                           //    images = a.images,
                           //    idCreator = a.idCreator,
                           //    madein = a.madein,
                           //    width = a.width,
                           //    high = a.high,
                           //    price = a.price,
                           //    length = a.length,
                           //    quantity = a.quantity,
                           //    isDelete = a.isDelete,
                           //    createdDate = a.createdDate,
                           //    updatedDate = a.updatedDate
                           //}).ToList()
                       }).ToList();

                return listcates;
            }
            catch (Exception ex)
            {
                return listcates;
            }
        }

        public List<CategoryDTO> getById(int id)
        {
            List<CategoryDTO> listcates = new List<CategoryDTO>();
            try
            {
                listcates = context.Categories.Where(x=>x.idCategory == id)
                       .Select(x => new CategoryDTO
                       {
                           idCategory = x.idCategory,
                           name = x.name,
                           createdDate = x.createdDate,
                           updatedDate = x.updatedDate,
                           isDelete = x.isDelete
                           //products = context.Products.Where(a => a.idCategory == x.idCategory).Select(a => new ProductDTO
                           //{
                           //    idProduct = a.idProduct,
                           //    name = a.name,
                           //    code = a.code,
                           //    avatar = a.avatar,
                           //    images = a.images,
                           //    idCreator = a.idCreator,
                           //    madein = a.madein,
                           //    width = a.width,
                           //    high = a.high,
                           //    price = a.price,
                           //    length = a.length,
                           //    quantity = a.quantity,
                           //    isDelete = a.isDelete,
                           //    createdDate = a.createdDate,
                           //    updatedDate = a.updatedDate
                           //}).ToList()
                       }).ToList();

                return listcates;
            }
            catch (Exception ex)
            {
                return listcates;
            }
        }
        public CategoryDTO create(Category category)
        {
            try
            {
                context.Categories.Add(category);
                context.SaveChanges();
                CategoryDTO catedto = context.Categories.Where(x => x.idCategory == category.idCategory)
                        .Select(x => new CategoryDTO
                        {
                            idCategory = x.idCategory,
                            name = x.name,
                            createdDate = x.createdDate,
                            updatedDate = x.updatedDate,
                            isDelete = x.isDelete,
                            //products = context.Products.Where(a => a.idCategory == x.idCategory).Select(a => new ProductDTO
                            //{
                            //    idProduct = a.idProduct,
                            //    name = a.name,
                            //    code = a.code,
                            //    avatar = a.avatar,
                            //    images = a.images,
                            //    idCreator = a.idCreator,
                            //    madein = a.madein,
                            //    width = a.width,
                            //    high = a.high,
                            //    price = a.price,
                            //    length = a.length,
                            //    quantity = a.quantity,
                            //    isDelete = a.isDelete,
                            //    createdDate = a.createdDate,
                            //    updatedDate = a.updatedDate
                            //}).ToList()
                        }).FirstOrDefault();

                return catedto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public CategoryDTO update(Category category)
        {
            try
            {
                context.Categories.Attach(category);
                context.Entry(category).State = System.Data.Entity.EntityState.Modified;
                context.SaveChanges();
                CategoryDTO catedto = context.Categories.Where(x => x.idCategory == category.idCategory)
                        .Select(x => new CategoryDTO
                        {
                            idCategory = x.idCategory,
                            name = x.name,
                            createdDate = x.createdDate,
                            updatedDate = x.updatedDate,
                            isDelete = x.isDelete,
                            products = context.Products.Where(a => a.idCategory == x.idCategory).Select(a => new ProductDTO
                            {
                                idProduct = a.idProduct,
                                name = a.name,
                                code = a.code,
                                avatar = a.avatar,
                                images = a.images,
                                idCreator = a.idCreator,
                                madein = a.madein,
                                width = a.width,
                                high = a.high,
                                price = a.price,
                                length = a.length,
                                quantity = a.quantity,
                                isDelete = a.isDelete,
                                createdDate = a.createdDate,
                                updatedDate = a.updatedDate
                            }).ToList()
                        }).FirstOrDefault();

                return catedto;
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
                var cate = context.Categories.Where(x => x.idCategory == id).FirstOrDefault();
                if (cate!=null)
                {
                    cate.isDelete = 1;
                    context.Categories.Attach(cate);
                    context.Entry(cate).State = System.Data.Entity.EntityState.Modified;
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