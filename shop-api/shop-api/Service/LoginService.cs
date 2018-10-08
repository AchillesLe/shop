using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.Models;
using shop_api.DTO;
using shop_api.Utility;


namespace shop_api.Service
{
    public class LoginService
    {
        private ShopApiModel context;
        public LoginService()
        {
            context = new ShopApiModel();
        }
        public UserDTO GetAccountLogin(string username, string password)
        {
            UserDTO user = null;
            var result = context.Users.Where(x => x.userName == username && x.password == password)
                .Select(x => new UserDTO { idUser = x.idUser, fullName = x.fullName, role = x.role ,userName = x.userName , password = x.password,createdDate = x.createdDate,updatedDate= x.updatedDate})
                .FirstOrDefault();
            if (result != null)
            {
                user = result;
            }
            return user;
        }

        public LoginDTO Create(UserDTO user)
        {
            LoginDTO loginDTO = null;
            try
            {
                Login reqlogin = new Login();
                string token = BaseCode64.Base64Encode(user.idUser.ToString()+ user.userName + DateTime.Now);
                reqlogin.idUser = user.idUser;
                reqlogin.token = token;
                reqlogin.createdTime = DateTime.Now;
                reqlogin.expiredTime = DateTime.Now.AddMinutes(30);
                context.Logins.Add(reqlogin);
                context.SaveChanges();

                loginDTO = new LoginDTO();
                loginDTO.idLogin = reqlogin.idLogin;
                loginDTO.idUser = reqlogin.idUser;
                loginDTO.expiredTime = reqlogin.expiredTime;
                loginDTO.createdTime = reqlogin.createdTime;
                loginDTO.token = token;
                loginDTO.User = user;
                return loginDTO;
            }
            catch (Exception ex)
            {
                return loginDTO;
            }
        }
        public bool DeleteToken(string token)
        {
            var userlogin = context.Logins.Where(x=>x.token == token).FirstOrDefault();
            if (userlogin!=null)
            {
                context.Logins.Remove(userlogin);
                context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            } 
        }
    }
}