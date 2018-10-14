using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using shop_api.DTO;
using System.Net.Http;
using shop_api.Service;
using shop_api.Models;

namespace shop_api.Utility
{
    
    public static class Token
    {
        public static string HandleToken(HttpRequestMessage Request)
        {
            string token = string.Empty;
            if (Request!=null)
            {
                var headers = Request.Headers;
                if (headers.Contains("token"))
                {
                    token = headers.GetValues("token").First();
                }
            }
            if (CheckToken(token) == true)
            {
                return token;
            }
            return string.Empty;
        }
        public static bool CheckToken(string token)
        {
            ShopApiModel context = new ShopApiModel();
            var result = context.Logins.Where(x=>x.token == token && x.expiredTime > DateTime.Now).FirstOrDefault();
            if (result!=null)
            {
                context.Dispose();
                return true;
            }
            context.Dispose();
            return false;
        }
        public static UserDTO getUser(string token)
        {
            ShopApiModel context = new ShopApiModel();
            try
            {
                UserDTO userdto = null;
                int iduser = context.Logins.Where(x => x.token == token && x.expiredTime > DateTime.Now).Select(x => x.idUser).FirstOrDefault();
                if (iduser > 0)
                {
                    userdto = context.Users.Where(x => x.iduser == iduser && x.isDelete == 0).Select(x => new UserDTO
                    {
                        iduser = x.iduser,
                        createdDate = x.createdDate,
                        password = x.password,
                        fullname = x.fullname,
                        updatedDate = x.updatedDate,
                        role = x.role,
                        username = x.username,
                        address = x.address,
                        cmnd = x.cmnd,
                        phone = x.phone,
                        isDelete = x.isDelete
                    }).FirstOrDefault();
                }
                context.Dispose();
                return userdto;
            }
            catch (Exception ex)
            {
                context.Dispose();
                return null;
            }
        }
    }
}