namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Login")]
    public partial class Login
    {
        [Key]
        public int idLogin { get; set; }

        public int idUser { get; set; }

        [Required]
        [StringLength(50)]
        public string token { get; set; }

        public DateTime createdTime { get; set; }

        public DateTime expiredTime { get; set; }

        public virtual User User { get; set; }
    }
}
