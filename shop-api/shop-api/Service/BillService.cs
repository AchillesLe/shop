using shop_api.DTO;
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



    }
}