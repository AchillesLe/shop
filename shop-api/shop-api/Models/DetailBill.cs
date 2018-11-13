namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DetailBill")]
    public partial class DetailBill
    {
        [Key]
        public int idDetailBill { get; set; }

        public int idBill { get; set; }

        public int idProduct { get; set; }

        public int quantity { get; set; }

        public decimal price { get; set; }

        public virtual Bill Bill { get; set; }

        public virtual Product Product { get; set; }
    }
}
