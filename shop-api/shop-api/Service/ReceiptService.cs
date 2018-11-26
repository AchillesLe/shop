using shop_api.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.Models;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;
using Newtonsoft.Json;
using shop_api.Utility;

namespace shop_api.Service
{
    public class ReceiptService
    {
        private ShopApiModel context = new ShopApiModel();

        public List<ReceiptDTO> GetAllByStatus(int status)
        {
            var listReceipt = this.context.Receipts.Where(x => x.status == status).Select(
                x => new ReceiptDTO
                {
                    idReceipt = x.idReceipt,
                    address = x.address,
                    description = x.description,
                    nameCustomer = x.nameCustomer,
                    email = x.email,
                    phone = x.phone,
                    total = x.total,
                    detailReceipts = x.detailReciepts.Where(a => a.idReciept == x.idReceipt).Select(a => new DetailReceiptDTO
                    {
                        idDetail = a.idDetail,
                        idReciept = a.idReciept,
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
                    updatedDate = x.updatedDate,
                    createdDate = x.createdDate,
                    Updator = new UserDTO
                    {
                        iduser = x.User.iduser,
                        fullname = x.User.fullname,
                    }
                }).OrderBy(x => x.idReceipt).ToList();
            return listReceipt;
        }
        public List<ReceiptDTO> GetAll()
        {
            var listReceipt = this.context.Receipts.Select(
                x => new ReceiptDTO
                {
                    idReceipt = x.idReceipt,
                    address = x.address,
                    description = x.description,
                    nameCustomer = x.nameCustomer,
                    phone = x.phone,
                    email = x.email,
                    total = x.total,
                    detailReceipts = x.detailReciepts.Where(a => a.idReciept == x.idReceipt).Select(a => new DetailReceiptDTO
                    {
                        idDetail = a.idDetail,
                        idReciept = a.idReciept,
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
                    updatedDate = x.updatedDate,
                    createdDate = x.createdDate,
                    Updator = new UserDTO
                    {
                        iduser = x.User.iduser,
                        fullname = x.User.fullname,
                    }
                }).OrderBy(x => x.idReceipt).ToList();
            return listReceipt;
        }
        public ReceiptDTO GetById(int id)
        {
            var Receipt = this.context.Receipts.Where(x => x.idReceipt == id).Select(
                x => new ReceiptDTO
                {
                    idReceipt = x.idReceipt,
                    address = x.address,
                    email = x.email,
                    description = x.description,
                    nameCustomer = x.nameCustomer,
                    phone = x.phone,
                    total = x.total,
                    detailReceipts = x.detailReciepts.Where(a => a.idReciept == x.idReceipt).Select(a => new DetailReceiptDTO
                    {
                        idDetail = a.idDetail,
                        idReciept = a.idReciept,
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
                    updatedDate = x.updatedDate,
                    createdDate = x.createdDate
                }).OrderBy(x => x.idReceipt).FirstOrDefault();
            return Receipt;
        }   
        public ReceiptDTO AddReceipt(RequestReceipt receipt)
        {
            Receipt newReceipt = new Receipt();
            newReceipt.address = receipt.address;
            newReceipt.description = receipt.description;
            newReceipt.idUpdator = null;
            newReceipt.nameCustomer = receipt.nameCustomer;
            newReceipt.phone = receipt.phone;
            newReceipt.email = receipt.email;
            newReceipt.total = receipt.total;
            newReceipt.createdDate = DateTime.Now;
            newReceipt.updatedDate = DateTime.Now;
            context.Receipts.Add(newReceipt);
            context.SaveChanges();
            if (newReceipt.idReceipt > 0)
            {
                List<RequestDetailReciept> detailReceipts = receipt.detailReceipts ;
                foreach (RequestDetailReciept detail in detailReceipts)
                {
                    DetailReciept newDetail = new DetailReciept();
                    newDetail.idReciept = newReceipt.idReceipt;
                    newDetail.idProduct = detail.idProduct;
                    newDetail.price = detail.price;
                    newDetail.quantity = detail.quantity;
                    context.DetailReciepts.Add(newDetail);
                    context.SaveChanges();
                    // update product
                    var product = context.Products.Where(x => x.idProduct == newDetail.idProduct).FirstOrDefault();
                    if (product.quantity > newDetail.quantity)
                    {
                        product.quantity = product.quantity - newDetail.quantity;
                        context.Products.Attach(product);
                        context.Entry(product).State =  System.Data.Entity.EntityState.Modified;
                    }
                }
                context.SaveChanges();
                return GetById(newReceipt.idReceipt);
            }
            else
            {
                return null;
            }

        }
        public bool UpdateStatus(int id, int status, int iduser)
        {
            try
            {
                var receipt = this.context.Receipts.Where(x => x.idReceipt == id).FirstOrDefault();
                receipt.status = status;
                this.context.Receipts.Attach(receipt);
                this.context.Entry(receipt).State = System.Data.Entity.EntityState.Modified;
                this.context.SaveChanges();
                var listDetail = context.DetailReciepts.Where(x=>x.idReciept == id).ToList();
                foreach (DetailReciept temp in listDetail)
                {
                    // update product
                    var product = context.Products.Where(x => x.idProduct == temp.idProduct).FirstOrDefault();
                    product.quantity = product.quantity + temp.quantity;
                    context.Products.Attach(product);
                    context.Entry(product).State = System.Data.Entity.EntityState.Modified;
                }
                this.context.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public List<ReceiptDTO> GetListByRangeDate(DateTime fromdate, DateTime todate)
        {
            var listReceipt = this.context.Receipts.Where(x => x.status == Status.OrderDone && x.updatedDate >= fromdate && x.updatedDate <= todate).Select(
                x => new ReceiptDTO
                {
                    idReceipt = x.idReceipt,
                    address = x.address,
                    description = x.description,
                    nameCustomer = x.nameCustomer,
                    phone = x.phone,
                    email = x.email,
                    total = x.total,
                    updatedDate = x.updatedDate,
                    createdDate = x.createdDate
                }).OrderBy(x => x.idReceipt).ToList();
            return listReceipt;

        }
    }
}