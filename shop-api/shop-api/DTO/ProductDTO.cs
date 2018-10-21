//using MultipartDataMediaFormatter.Infrastructure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class ProductDTO
    {
        public int idProduct { get; set; }
        public int? idCategory { get; set; }
        public string categoryName { get; set; }
        public string code { get; set; }
        public string name { get; set; }
        public decimal? length { get; set; }
        public decimal? width { get; set; }
        public decimal? high { get; set; }
        public decimal priceIn { get; set; }
        public decimal priceOut { get; set; }
        public string madein { get; set; }
        public int quantity { get; set; }
        public string description { get; set; }
        public string avatar { get; set; }
        public string images { get; set; }
        public int idCreator { get; set; }
        public string creatorName { get; set; }
        public int isDelete { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime updatedDate { get; set; }

    }
}