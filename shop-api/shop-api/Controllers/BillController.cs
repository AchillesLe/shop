using shop_api.Service;
using shop_api.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace shop_api.Controllers
{
    [RoutePrefix("api/bill")]
    public class BillController : ApiController
    {
        BillService receiptService = new BillService();
        [HttpGet(), Route("getall")]
        public IHttpActionResult GetAll()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAll());
        }
    }
}
