using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.Utility
{
    public class Status
    {
        public static int OrderWaiting = 0;
        public static int OrderConfirmed = 1;
        public static int OrderCancel = 2;
        public static int OrderDone = 3;
    }
}