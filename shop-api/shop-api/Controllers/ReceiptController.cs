using shop_api.Utility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.Service;
using shop_api.DTO.RequestDTO;
using shop_api.DTO;
using shop_api.Utility;
using Newtonsoft.Json;

namespace shop_api.Controllers
{
    [RoutePrefix("api/receipt")]
    public class ReceiptController : ApiController
    {
        ReceiptService receiptService = new ReceiptService();
        [HttpGet(),Route("getallwaitingconfirm")]
        public IHttpActionResult GetAllWaitingConfirm()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAllByStatus(Status.OrderWaiting));
        }
        [HttpGet(), Route("getallconfirmed")]
        public IHttpActionResult GetAllConfirmed()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAllByStatus(Status.OrderConfirmed));
        }
        [HttpGet(), Route("getallcancel")]
        public IHttpActionResult GetAllCancel()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAllByStatus(Status.OrderCancel));
        }
        [HttpGet(), Route("getalldone")]
        public IHttpActionResult GetAllDone()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAllByStatus(Status.OrderDone));
        }
        [HttpGet(), Route("getall")]
        public IHttpActionResult GetAll()
        {
            string token = Token.HandleToken(Request);
            if (token == "") return BadRequest(Message.messageNotValidToken);
            return Ok(receiptService.GetAll());
        }
        [HttpGet(), Route("getreceipt/{id:int}")]
        public IHttpActionResult GetbyId(int id)
        {
            if (id > 0)
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                return Ok(receiptService.GetById(id));
            }
            return BadRequest();
        }

        [HttpPut(), Route("addreceipt")]
        public IHttpActionResult AddReceipt([FromBody] RequestReceipt receipt)
        {
            try
            {
                if ( receipt!=null && receipt.detailReceipts.Length > 0)
                {
                    List<RequestDetailReciept>  detailReceipts = JsonConvert.DeserializeObject<List<RequestDetailReciept>>(receipt.detailReceipts);
                    if (detailReceipts.Count > 0)
                    {
                        ReceiptDTO result = receiptService.AddReceipt(receipt);
                        if ( result != null )
                        {
                            return Ok(new { message = Message.messageAddReceiptSuccess, data = result });
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

        [HttpPost(), Route("updatestatusconfirmed")]
        public IHttpActionResult UpdateStatusConfirmed([FromBody] RequestStatus Receipt)
        {
            
            if (Receipt!=null && Receipt.idReceipt > 0)
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                UserDTO user = Token.getUser(token);
                if (user != null)
                {
                    if (receiptService.UpdateStatus(Receipt.idReceipt, Status.OrderConfirmed,user.iduser))
                    {
                        return Ok(Message.messageUpdateSuccess);
                    }
                    else
                    {
                        return Ok(Message.messageUpdateFailed);
                    }
                }
            }
            return BadRequest(Message.messageAddInvalidParamter);
        }
        [HttpPost(), Route("updatestatuscancel")]
        public IHttpActionResult UpdateStatusCancel([FromBody] RequestStatus Receipt)
        {
            if (Receipt != null && Receipt.idReceipt > 0)
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                UserDTO user = Token.getUser(token);
                if (user != null)
                {
                    if (receiptService.UpdateStatus(Receipt.idReceipt, Status.OrderCancel, user.iduser))
                    {
                        return Ok(Message.messageUpdateSuccess);
                    }
                    else
                    {
                        return Ok(Message.messageUpdateFailed);
                    }
                }
            }
            return BadRequest();
        }
        [HttpPost(), Route("updatestatusdone")]
        public IHttpActionResult UpdateStatusDone([FromBody] RequestStatus Receipt)
        {
            if (Receipt != null && Receipt.idReceipt > 0)
            {
                string token = Token.HandleToken(Request);
                if (token == "") return BadRequest(Message.messageNotValidToken);
                UserDTO user = Token.getUser(token);
                if (user != null)
                {
                    if (receiptService.UpdateStatus(Receipt.idReceipt, Status.OrderDone, user.iduser))
                    {
                        return Ok(Message.messageUpdateSuccess);
                    }
                    else
                    {
                        return Ok(Message.messageUpdateFailed);
                    }
                }
            }
            return BadRequest();
        }
    }
}
