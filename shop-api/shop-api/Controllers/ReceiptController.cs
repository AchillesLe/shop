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
using System.Net.Mail;

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
                if ( receipt!=null && receipt.detailReceipts.Count > 0)
                {
                    Dictionary<string,ReceiptDTO> result = receiptService.AddReceipt(receipt);
                    if (result.First().Value != null)
                    {
                        ReceiptDTO Dreceipt = result.First().Value;
                        // send mail if email valid
                        string emailTo = receipt.email;
                        RegexUtilities util = new RegexUtilities();
                        if (emailTo != "" && util.IsValidEmail(emailTo))
                        {
                            SendMail mail = new SendMail();
string subject = "Mail thông tin đơn hàng !";
string body = "<div style='padding: 30px'>";
body += string.Format("<h1>Thông tin đơn hàng từ Toy Shop ngày {0: dd/MM/yyyy HH:mm} .</h1>", DateTime.Now);
body += string.Format("<p style='margin-top:50px'><span style='font-size :18px;font-weight:600;margin-right:10px'>Mã đơn hàng :</span><span style='color:red'>{0}</span> </p>", Dreceipt.idReceipt);
body += string.Format("<p><span style='font-size :18px;font-weight:600;margin-right:10px'>Tên khách hàng :</span><span style='color:red'>{0}</span> </p>", Dreceipt.nameCustomer);
body += string.Format("<p><span style='font-size :18px;font-weight:600;margin-right:10px'>Địa chỉ :</span><span style='color:red'>{0}</span> </p>", Dreceipt.address);
body += string.Format("<p><span style='font-size :18px;font-weight:600;margin-right:10px'>Số điện thoại :</span><span style='color:red'>{0}</span> </p>", Dreceipt.phone);
body += string.Format("<p style='font-size :18px; font-weight:600; margin-right:10px'>Chi tiết đơn hàng </p>");

body += string.Format("<div style='padding: 0 50px;'>");
body += string.Format("<table>");
body += string.Format("<thead>");
body += string.Format("<tr>");
body += string.Format("<td style='font-size:16px; width: 100px; font-weight:600;'>STT</td>");
body += string.Format("<td style='font-size:16px; width: 300px; font-weight:600'>Tên</td>");
body += string.Format("<td style='font-size:16px; width: 120px; font-weight:600'>Số lượng</td>");
body += string.Format("<td style='font-size:16px; width: 200px; font-weight:600'>Đơn vị Giá</td>");
body += string.Format("</tr>");
body += string.Format("</thead>");
body += string.Format("<tbody>");
                            
                            // vong lap
                            for (int i = 0; i < Dreceipt.detailReceipts.Count; i++)
                            {
                                body += string.Format("<tr>");
                                body += string.Format("<td>{0}</td>",i+1);
                                body += string.Format("<td>{0}</td>", Dreceipt.detailReceipts[i].Product.name);
                                body += string.Format("<td>{0}</td>", Dreceipt.detailReceipts[i].quantity);
                                body += string.Format("<td>{0}</td>", Dreceipt.detailReceipts[i].price);
                                body += string.Format("</tr>");
                            }
body += string.Format("</tbody>");
body += string.Format("</table>");
body += string.Format("</div>");
body += string.Format("<div style='margin: 50px'><span style='font-size :18px; font-weight:600; margin-right:10px'>Tổng tiền :</span><span style='color: red'>{0}</span></div>", Dreceipt.total);
body += string.Format("<div style='margin-top:30px'> Trân trọng cảm ơn quý khách !</div>");
body += string.Format("<div style='margin-top:10px; font-style: italic; '> Thư được gửi tử ban quản trị toy shop .</div>");
body += string.Format("</div>");
                            mail.sendMail("", emailTo, subject, body, true);
                        }
                        return Ok(new { message = Message.messageAddReceiptSuccess });
                    }
                    else
                    {
                        return BadRequest(result.First().Key);
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
