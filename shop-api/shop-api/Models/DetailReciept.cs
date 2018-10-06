namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("DetailReciept")]
    public partial class DetailReciept
    {
        [Key]
        public int idDetail { get; set; }

        public int idReciept { get; set; }

        public int idProduct { get; set; }

        public int quantity { get; set; }

        public decimal price { get; set; }

        public virtual Product Product { get; set; }

        public virtual Receipt Receipt { get; set; }
    }
}
