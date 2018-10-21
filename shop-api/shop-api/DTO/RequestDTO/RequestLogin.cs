using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO.RequestDTO
{
    public class RequestLogin
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}