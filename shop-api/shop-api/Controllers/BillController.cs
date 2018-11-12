using Newtonsoft.Json;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;
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
        BillService billService = new BillService();
        [HttpGet(), Route("getall")]
        public IHttpActionResult GetAll()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(billService.GetAll());
        }
        [HttpGet(), Route("getbill/{id:int}")]
        public IHttpActionResult GetbyId(int id)
        {
            if (id > 0)
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                return Ok(billService.GetById(id));
            }
            return BadRequest();
        }
        [HttpPost(), Route("addbill")]
        public IHttpActionResult AddBill([FromBody] RequestBill bill)
        {
            try
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                UserDTO user = Token.getUser(token);
                if (user != null)
                {
                    if (bill != null && bill.detailBills.Length > 0)
                    {
                        List<RequestDetailBill> detailBills = JsonConvert.DeserializeObject<List<RequestDetailBill>>(bill.detailBills);
                        if (detailBills.Count > 0)
                        {
                            BillDTO result = billService.AddBill(bill, user.iduser);
                            if (result != null)
                            {
                                return Ok(new { message = Message.messageAddReceiptSuccess, data = result });
                            }
                        }
                    }
                }
                return BadRequest();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
