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
                .Select(x=>new UserDTO {
                    iduser = x.iduser,
                    createdDate =x.createdDate,
                    password =x.password,
                    fullname =x.fullname,
                    updatedDate =x.updatedDate,
                    role =x.role,
                    username =x.username,
                    address = x.address,
                    cmnd=x.cmnd,
                    phone=x.phone,
                    isDelete =x.isDelete })
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
                    userdto = context.Users.Where(x => x.iduser == iduser && x.isDelete == 0)
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
                        })
                        .FirstOrDefault();
                }
                return userdto;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
        public UserDTO getUserById(int id)
        {
            try
            {
                UserDTO userdto = null;
                userdto = context.Users.Where(x => x.iduser == id && x.isDelete == 0)
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
                context.Users.Add(user);
                context.SaveChanges();
                UserDTO userdto = context.Users.Where(x => x.iduser == user.iduser && x.isDelete == 0)
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

                return userdto;
            }
            catch (Exception  ex)
            {
                return null;
            }
        }
        // Không update username
        public UserDTO update(User requser)
        {
            UserDTO userdto = new UserDTO();
            try
            {
                User user = context.Users.Where(x => x.iduser == requser.iduser).FirstOrDefault();
                if (user!=null)
                {
                    user.fullname = requser.fullname;
                    user.password = requser.password;
                    user.phone = requser.phone;
                    user.address = requser.address;
                    user.cmnd = requser.cmnd;
                    user.password = requser.password;
                    user.updatedDate = DateTime.Now;
    
                    context.Users.Attach(user);
                    context.Entry(user).State = System.Data.Entity.EntityState.Modified;
                    context.SaveChanges();
                    userdto = context.Users.Where(x => x.iduser == user.iduser && x.isDelete == 0)
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
                }
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
                User user = context.Users.Where(x => x.iduser == iduser).FirstOrDefault();
                if (user!=null)
                {
                    user.isDelete = 1;
                    context.Users.Attach(user);
                    context.Entry(user).State = System.Data.Entity.EntityState.Modified;
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

        public bool  CheckUserName(string username)
        {
            var checkuser = context.Users.Where(x=>x.username == username).FirstOrDefault();
            if (checkuser!=null)
            {
                return true;
            }
            return false;
        }
        public bool CheckCMND(string cmnd)
        {
            var checkuser = context.Users.Where(x => x.cmnd == cmnd).FirstOrDefault();
            if (checkuser != null)
            {
                return true;
            }
            return false;
        }
        // Check khi update cmnd
        public bool CheckCMND(int idUser, string cmnd)
        {
            var checkuser = context.Users.Where(x => x.iduser != idUser && x.cmnd == cmnd).FirstOrDefault();
            if (checkuser != null)
            {
                return true;
            }
            return false;
        }
    }
}