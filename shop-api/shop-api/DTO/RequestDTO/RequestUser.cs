using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO.RequestDTO
{
    public class RequestUser
    {
        public int iduser { get; set; }
        public string fullname { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int role { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string cmnd { get; set; }
    }
}