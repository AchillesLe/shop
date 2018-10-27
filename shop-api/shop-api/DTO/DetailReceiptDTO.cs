using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class DetailReceiptDTO
    {
        public int idDetail { get; set; }
        public int idReciept { get; set; }
        public ProductDTO Product { get; set; }
        public int quantity { get; set; }
        public decimal price { get; set; }
    }
}