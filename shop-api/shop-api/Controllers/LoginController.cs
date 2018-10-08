using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.DTO;
using shop_api.Service;
using shop_api.DTO.RequestDTO;
namespace shop_api.Controllers
{
    [RoutePrefix("api")]
    public class LoginController : ApiController
    {
        LoginService LoginService;
        public LoginController()
        {
            LoginService = new LoginService();
        }
        [HttpPost(),Route("login")]
        public HttpResponseMessage login([FromBody]RequestLogin requestLogin)
        {
            string username = requestLogin.username.Trim();
            string password = requestLogin.password.Trim();
            LoginDTO login = null;
            UserDTO user = LoginService.GetAccountLogin(username, password);
            if (user != null )
            {
                login = LoginService.Create(user);
                return Request.CreateResponse(HttpStatusCode.OK, login);

            }
            return Request.CreateResponse(HttpStatusCode.NotFound , login);
        }
        
    }
}
