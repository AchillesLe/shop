using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.Models;
using shop_api.Utility;
namespace shop_api.DTO
{
    public class LoginDTO
    {
       
        public LoginDTO()
        {
            
        }
        
        public int idLogin { get; set; }

        public int idUser { get; set; }

        public string token { get; set; }

        public DateTime createdTime { get; set; }

        public DateTime expiredTime { get; set; }

        public  UserDTO User { get; set; }
    }
}