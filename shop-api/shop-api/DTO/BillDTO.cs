using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class BillDTO
    {

        public int idBill { get; set; }
        public decimal codeBill { get; set; }
        public string nameSupplier { get; set; }
        public decimal total { get; set; }
        public List<DetailBillDTO> detailBills { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime updatedDate { get; set; }
        public UserDTO User { get; set; }
        
    }
}