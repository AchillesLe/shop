using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.DTO;
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
            string token = Token.HandelToken(Request);
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
        public IHttpActionResult CreateUser()
        {
            return Ok();
        }
    }
}
