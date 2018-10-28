using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO.RequestDTO
{
    public class RequestDetailReciept
    {
        public int idDetail { get; set; }

        public int idReciept { get; set; }

        public int idProduct { get; set; }

        public int quantity { get; set; }

        public decimal price { get; set; }
    }
}