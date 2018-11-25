using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using shop_api.Models;
using shop_api.DTO;
using shop_api.DTO.RequestDTO;

namespace shop_api.Service
{
    public class StatisticService
    {
        ReceiptService receiptService = new ReceiptService();
        public Dictionary<decimal, List<ReceiptDTO>> getRevenueByRangeDate(DateTime fromdate, DateTime todate)
        {
            Dictionary<decimal, List<ReceiptDTO>> result = new Dictionary<decimal, List<ReceiptDTO>>();
            List<ReceiptDTO> listReceipt = receiptService.GetListByRangeDate(fromdate, todate);
            if (listReceipt!=null && listReceipt.Count > 0)
            {
                decimal total = listReceipt.Sum(x => x.total);
                result.Add(total, listReceipt);
            }
            return result;
        }
    }
}