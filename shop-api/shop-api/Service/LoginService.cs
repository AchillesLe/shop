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
            try
            {
                UserDTO user = null;
                var result = context.Users.Where(x => x.username == username && x.password == password)
                    .Select(x => new UserDTO
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
                if (result != null)
                {
                    user = result;
                }
                return user;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public bool CheckHasLogin(int idUser)
        {
            var user = context.Logins.Where(x=>x.idUser == idUser && x.expiredTime > DateTime.Now).FirstOrDefault();
            if (user != null)
            {
                return true;
            }
            return false;
        }
        public LoginDTO Create(UserDTO user)
        {
            LoginDTO loginDTO = null;
            try
            {
                Login reqlogin = new Login();
                string token = BaseCode64.Base64Encode(user.iduser.ToString()+ user.username + DateTime.Now);
                reqlogin.idUser = user.iduser;
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

        public LoginDTO Update(UserDTO User)
        {
            LoginDTO loginDTO = null;
            try
            {
                string token = BaseCode64.Base64Encode(User.iduser.ToString() + User.username + DateTime.Now);
                var login = this.context.Logins.Where(x=>x.idUser == User.iduser && x.expiredTime > DateTime.Now).FirstOrDefault();
                login.token = token;
                login.expiredTime = DateTime.Now.AddMinutes(30);
                this.context.Logins.Attach(login);
                this.context.Entry(login).State = System.Data.Entity.EntityState.Modified;
                this.context.SaveChanges();

                loginDTO = new LoginDTO();
                loginDTO.idLogin = login.idLogin;
                loginDTO.idUser = login.idUser;
                loginDTO.expiredTime = login.expiredTime;
                loginDTO.createdTime = login.createdTime;
                loginDTO.token = token;
                loginDTO.User = User;
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