using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace shop_api.DTO
{
    public class CategoryDTO
    {
        public int idCategory { get; set; }
        public string name { get; set; }

        public int idCreator { get; set; }

        public int isDelete { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        public List<ProductDTO> products { get; set; }
    }
}