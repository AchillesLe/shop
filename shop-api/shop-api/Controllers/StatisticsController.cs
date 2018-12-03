using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using shop_api.Service;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;
using shop_api.Utility;

namespace shop_api.Controllers
{
    [RoutePrefix("api/statistic")]
    public class StatisticsController : ApiController
    {
        StatisticService statisticService = new StatisticService();
        [HttpGet(),Route("getByRangeDate")]
        public IHttpActionResult GetstatisticByRangeDate([FromUri] RequestStatistic requestDateRage )
        {
            try
            {
                var headers = Request.Headers;
                string token = Token.HandleToken(Request);
                if (token == String.Empty)
                {
                    return BadRequest(Message.messageNotValidToken);
                }

                DateTime FromDate = DateTime.ParseExact(requestDateRage.dateFrom, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                DateTime ToDate = DateTime.ParseExact(requestDateRage.dateTo, "yyyy-MM-dd", System.Globalization.CultureInfo.InvariantCulture);
                var data = statisticService.getRevenueByRangeDate(FromDate, ToDate);
                if ( data!=null && data.Count > 0)
                {
                    return Ok(new { total = data.Keys.First(), data = data.Values.First() });
                }
                return Ok(new { total = 0 , data = new List<ReceiptDTO>()  });
            }
            catch (Exception ex)
            {
                return BadRequest(Message.messageDateInCorrectFormat);
            }
        }
    }
}
