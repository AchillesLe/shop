using Newtonsoft.Json;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;
using shop_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.Service
{
    public class BillService
    {
        private ShopApiModel context = new ShopApiModel();
        public List<BillDTO> GetAll()
        {
            var listBill = this.context.Bills.Select(
                x => new BillDTO
                {
                    idBill = x.idBill,
                    codeBill = x.codeBill,
                    nameSupplier = x.nameSupplier,
                    total = x.total,
                    detailBills = x.detailBills.Where(a => a.idBill == x.idBill).Select(a => new DetailBillDTO
                    {
                        idDetailBill = a.idDetailBill,
                        idBill = a.idBill,
                        price = a.price,
                        Product = new ProductDTO
                        {
                            idProduct = a.Product.idProduct,
                            avatar = a.Product.avatar,
                            images = a.Product.images,
                            code = a.Product.code,
                            idCategory = a.Product.idCategory,
                            categoryName = a.Product.Category.name,
                            high = a.Product.high,
                            length = a.Product.length,
                            width = a.Product.width,
                            madein = a.Product.madein,
                            name = a.Product.name,
                            quantity = a.Product.quantity,
                            description = a.Product.description,
                            priceOut = a.Product.priceOut,
                            updatedDate = a.Product.updatedDate,
                            createdDate = a.Product.createdDate,
                            creatorName = a.Product.User.fullname,
                            idCreator = a.Product.idCreator
                        }
                    }).ToList(),
                    createdDate = x.createdDate,
                    updatedDate = x.updatedDate,
                    User = new UserDTO
                    {
                        iduser = x.User.iduser,
                        fullname = x.User.fullname,
                    }
                }).OrderBy(x => x.idBill).ToList();
            return listBill;
        }

        public BillDTO GetById(int id)
        {
            var Bill = this.context.Bills.Where(x => x.idBill == id).Select(
                x => new BillDTO
                {
                    idBill = x.idBill,
                    codeBill = x.codeBill,
                    nameSupplier = x.nameSupplier,
                    total = x.total,
                    detailBills = x.detailBills.Where(a => a.idBill == x.idBill).Select(a => new DetailBillDTO
                    {
                        idDetailBill = a.idDetailBill,
                        idBill = a.idBill,
                        price = a.price,
                        Product = new ProductDTO
                        {
                            idProduct = a.Product.idProduct,
                            avatar = a.Product.avatar,
                            images = a.Product.images,
                            code = a.Product.code,
                            idCategory = a.Product.idCategory,
                            categoryName = a.Product.Category.name,
                            high = a.Product.high,
                            length = a.Product.length,
                            width = a.Product.width,
                            madein = a.Product.madein,
                            name = a.Product.name,
                            quantity = a.Product.quantity,
                            description = a.Product.description,
                            priceOut = a.Product.priceOut,
                            updatedDate = a.Product.updatedDate,
                            createdDate = a.Product.createdDate,
                            creatorName = a.Product.User.fullname,
                            idCreator = a.Product.idCreator
                        }
                    }).ToList(),
                    createdDate = x.createdDate,
                    updatedDate = x.updatedDate,
                    User = new UserDTO
                    {
                        iduser = x.User.iduser,
                        fullname = x.User.fullname,
                    }
                }).OrderBy(x => x.idBill).FirstOrDefault();
            return Bill;
        }

        public BillDTO AddBill(RequestBill bill, int iduser)
        {

            Bill newBill = new Bill();
            newBill.codeBill = bill.codeBill;
            newBill.idUpdator = iduser;
            newBill.nameSupplier = bill.nameSupplier;
            newBill.total = bill.total;
            newBill.createdDate = DateTime.Now;
            newBill.updatedDate = DateTime.Now;
            context.Bills.Add(newBill);
            context.SaveChanges();
            if (newBill.idBill > 0)
            {
                List<RequestDetailBill> detailBills = JsonConvert.DeserializeObject<List<RequestDetailBill>>(bill.detailBills);
                foreach (RequestDetailBill detail in detailBills)
                {
                    DetailBill newDetail = new DetailBill();

                    newDetail.idBill = newBill.idBill;
                    newDetail.idProduct = detail.idProduct;
                    newDetail.price = detail.price;
                    newDetail.quantity = detail.quantity;
                    context.DetailBills.Add(newDetail);
                    context.SaveChanges();
                    // update product
                    var product = context.Products.Where(x => x.idProduct == newDetail.idProduct).FirstOrDefault();
                    if (product.quantity > newDetail.quantity)
                    {
                        product.quantity = product.quantity + newDetail.quantity;
                        context.Products.Attach(product);
                        context.Entry(product).State = System.Data.Entity.EntityState.Modified;
                    }
                }
                context.SaveChanges();
                return GetById(newBill.idBill);
            }
            else
            {
                return null;
            }

        }
    }
}