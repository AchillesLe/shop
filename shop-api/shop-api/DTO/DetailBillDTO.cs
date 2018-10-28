using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class DetailBillDTO
    {
        public int idDetailBill { get; set; }
        public int idBill { get; set; }
        public ProductDTO Product { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
    }
}