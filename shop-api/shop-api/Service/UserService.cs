using shop_api.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.Models;
namespace shop_api.Service
{
    public class UserService
    {
        private ShopApiModel context = new ShopApiModel();
        public List<UserDTO> getall()
        {
            List< UserDTO> listuser = context.Users.Where(x=>x.isDelete == 0 )
                .Select(x=>new UserDTO { idUser = x.idUser ,createdDate=x.createdDate,password=x.password,fullName=x.fullName,updatedDate=x.updatedDate,role=x.role,userName=x.userName,isDelete=x.isDelete })
                .ToList();
            return listuser;
        }
        public UserDTO getUserByToken(string token)
        {
            try
            {
                UserDTO userdto = null;
                int iduser = context.Logins.Where(x=>x.token == token && x.expiredTime > DateTime.Now).Select(x=>x.idUser).FirstOrDefault();
                if (iduser > 0)
                {
                    userdto = context.Users.Where(x => x.idUser == iduser && x.isDelete == 0).Select(x => new UserDTO { idUser = x.idUser, createdDate = x.createdDate, password = x.password, fullName = x.fullName, updatedDate = x.updatedDate, role = x.role, userName = x.userName, isDelete = x.isDelete })
                        .FirstOrDefault();
                }
                return userdto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public UserDTO create(User user)
        {
            try {
                UserDTO userdto = new UserDTO();
                context.Users.Add(user);
                context.SaveChanges();
                userdto.createdDate = user.createdDate;
                userdto.fullName = user.fullName;
                userdto.idUser = user.idUser;
                userdto.isDelete = user.isDelete;
                userdto.password = user.password;
                userdto.updatedDate = user.updatedDate;
                userdto.userName = user.userName;
                return userdto;
            }
            catch (Exception  ex)
            {
                return null;
            }
        }
        public UserDTO update(User user)
        {
            try
            {
                UserDTO userdto = new UserDTO();
                context.Users.Add(user);
                context.SaveChanges();
                userdto.createdDate = user.createdDate;
                userdto.fullName = user.fullName;
                userdto.idUser = user.idUser;
                userdto.isDelete = user.isDelete;
                userdto.password = user.password;
                userdto.updatedDate = user.updatedDate;
                userdto.userName = user.userName;
                return userdto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public bool Delete(int iduser)
        {
            try
            {
                User user = context.Users.Where(x => x.idUser == iduser).FirstOrDefault();
                if (user!=null)
                {
                    user.isDelete = 1;
                    context.Users.Add(user);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}