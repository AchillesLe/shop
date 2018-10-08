﻿using System;
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
    public class LogoutController : ApiController
    {
        LoginService LoginService;
        public LogoutController()
        {
            LoginService = new LoginService();
        }
        [HttpGet(), Route("logout")]
        public HttpResponseMessage logout()
        {
            var headers = Request.Headers;
            string token = "";
            if (headers.Contains("token"))
            {
                token = headers.GetValues("token").First();
            }
            if (token!= "" &&LoginService.DeleteToken(token))
            {
                return Request.CreateResponse(HttpStatusCode.OK,"Logout successfuly !");
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
    }
}