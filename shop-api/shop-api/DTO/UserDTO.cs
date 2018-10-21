﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class UserDTO
    {
        public int iduser { get; set; }
        public string fullname { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public int role { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string cmnd { get; set; }
        public int isDelete { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime updatedDate { get; set; }
    }
}