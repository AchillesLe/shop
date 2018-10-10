using System;
using System.Collections.Generic;
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
        [HttpPut(), Route("create")]
        public IHttpActionResult CreateUser([FromBody]RequestUser requser)
        {
            try
            {
                if (requser != null)
                {
                    string token = Token.HandleToken(Request);
                    UserDTO whoReq = Token.getUser(token);
                    if (whoReq!=null && whoReq.role == 1)
                    {
                        User user = new User();
                        user.fullname = requser.fullname;
                        user.username = requser.username;
                        user.password = requser.password;
                        user.address = requser.address;
                        user.cmnd = requser.cmnd;
                        user.phone = requser.phone;
                        if (ModelState.IsValid)
                        {
                            UserDTO userdto = userService.create(user);
                            if (userdto != null)
                            {
                                return Ok(userdto);
                            }
                        }
                        else
                        {
                            var errorList = ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                            string errors = JsonConvert.SerializeObject(errorList);
                            return BadRequest(errors);
                        }
                        return InternalServerError();
                    }
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return InternalServerError();
            }

        }
        [HttpPost(), Route("update")]
        public IHttpActionResult UpdateUser([FromBody]RequestUser requser)
        {
            try
            {
                if (requser != null)
                {
                    string token = Token.HandleToken(Request);
                    UserDTO whoReq = Token.getUser(token);
                    if (whoReq != null && whoReq.role == 1)
                    {
                        User user = new User();
                        user.fullname = requser.fullname;
                        user.username = requser.username;
                        user.password = requser.password;
                        user.address = requser.address;
                        user.cmnd = requser.cmnd;
                        user.phone = requser.phone;
                        if (ModelState.IsValid)
                        {
                            UserDTO userdto = userService.update(user);
                            if (userdto != null)
                            {
                                return Ok(userdto);
                            }
                        }
                        else
                        {
                            var errorList = ModelState.Values.SelectMany(m => m.Errors)
                                 .Select(e => e.ErrorMessage)
                                 .ToList();
                            string errors = JsonConvert.SerializeObject(errorList);
                            return BadRequest(errors);
                        }
                        return InternalServerError();
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
