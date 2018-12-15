using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;
using shop_api.Models;
using shop_api.Service;
using shop_api.Utility;

namespace shop_api.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        private UserService userService = new UserService();
        [HttpGet(), Route("getall")]
        public IHttpActionResult getall()
        {
            string token = Token.HandleToken(Request);
            if(token != "")
            {
                List<UserDTO> list = userService.getall();
                if (list!=null)
                {
                    return Ok(list);
                }
                else
                {
                    return InternalServerError();
                }
               
            }
            return BadRequest(Message.messageRequireInvalid);
        }

        [HttpGet(), Route("getuser/{id:int}")]
        public IHttpActionResult getuser(int id)
        {
            string token = Token.HandleToken(Request);
            if (token != "")
            {
                UserDTO userRes = userService.getUserById(id);
                if (userRes != null)
                {
                    return Ok(userRes);
                }
                return NotFound();
            }
            return BadRequest(Message.messageRequireInvalid);
        }

        [HttpPost(), Route("add")]
        public IHttpActionResult CreateUser([FromBody]RequestUser requser)
        {
            try
            {
                if (requser != null)
                {
                    string token = Token.HandleToken(Request);
                    if (token == string.Empty)
                    {
                        return BadRequest(Message.messageNotValidToken);
                    }
                    UserDTO whoReq = Token.getUser(token);
                    if (whoReq!=null && whoReq.role == 1)
                    {
                        User user = new User();
                        user.fullname = requser.fullname;
                        user.username = requser.username;
                        user.password = requser.password;
                        user.address = requser.address;
                        user.cmnd = requser.cmnd;
                        user.role = 0;
                        user.phone = requser.phone;
                        user.updatedDate = DateTime.Now;
                        user.createdDate = DateTime.Now;
                        user.isDelete = 0;
                        if (userService.CheckUserName(requser.username))
                        {
                            return BadRequest(Message.messageUserNameExist);
                        }
                        if (userService.CheckCMND(requser.cmnd))
                        {
                            return BadRequest(Message.messageCMNDExist);
                        }
                        UserDTO userdto = userService.create(user);

                        return Ok(userdto);
                    }
                    else
                    {
                        return BadRequest(Message.messageNoEnoughRole);
                    }
                }
                return BadRequest(Message.messageNotValidRequest);
            }
            catch (DbEntityValidationException ex)
            {
                string message = "";
                foreach (var eve in ex.EntityValidationErrors)
                {
                    foreach (var ve in eve.ValidationErrors)
                    {
                        message += string.Format(" field: \'{0}\', Error: \'{1}\'",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                return BadRequest(message);
            }

        }
        [HttpPut(), Route("update/{id:int}")]
        public IHttpActionResult UpdateUser([FromUri]int id,[FromBody]RequestUser requser)
        {
            try
            {
                if (requser != null)
                {
                    string token = Token.HandleToken(Request);
                    if (token == string.Empty)
                    {
                        return BadRequest(Message.messageNotValidToken);
                    }
                    UserDTO whoReq = Token.getUser(token);
                    if (whoReq != null && whoReq.role == 1)
                    {
                        if (userService.CheckCMND(id, requser.cmnd))
                        {
                            return BadRequest(Message.messageCMNDExist);
                        }
                        requser.iduser = id;
                        UserDTO userdto = userService.update(requser);
                        if (userdto != null)
                        {
                            return Ok(userdto);
                        }
                        return BadRequest(Message.messageIdNotFoundUser);
                    }
                    else
                    {
                        return BadRequest(Message.messageNoEnoughRole);
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }
        [HttpDelete(), Route("delete/{id:int}")]
        public IHttpActionResult Delete([FromUri] int id)
        {
            try
            {
                if (id > 0 )
                {
                    string token = Token.HandleToken(Request);
                    if (token == string.Empty)
                    {
                        return BadRequest(Message.messageNotValidToken);
                    }
                    UserDTO whoReq = Token.getUser(token);
                    if (whoReq != null && whoReq.role == 1)
                    {
                        if (whoReq.iduser == id)
                        {
                            return Ok(Message.messageDeleteYourSelf);
                        }
                        UserDTO user = userService.getUserById(id);
                        if (user != null)
                        {
                            if (userService.Delete(id))
                            {
                                return Ok(Message.messageDeleteSuccessfully);
                            }
                        }
                        return NotFound();
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }
        }
    }
}
