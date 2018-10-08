using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class UserDTO
    {
        public int idUser { get; set; }

        public string fullName { get; set; }
        public string userName { get; set; }

        public string password { get; set; }

        public int role { get; set; }

        public int isDelete { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }
    }
}