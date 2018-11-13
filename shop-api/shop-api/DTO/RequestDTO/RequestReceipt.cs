using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO.RequestDTO
{
    public class RequestReceipt
    {
        public int idReceipt { get; set; }
        public string nameCustomer { get; set; }
        public string address { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
        public string description { get; set; }
        public decimal total { get; set; }
        public string detailReceipts { get; set; }
        public int UpdatorID { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime updatedDate { get; set; }
    }
}