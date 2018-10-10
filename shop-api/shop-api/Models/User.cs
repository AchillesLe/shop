namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("User")]
    public partial class User
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            Logins = new HashSet<Login>();
            Products = new HashSet<Product>();
            Receipts = new HashSet<Receipt>();
        }

        [Key]
        public int iduser { get; set; }

        [Required]
        [StringLength(250)]
        public string fullname { get; set; }

        [StringLength(50)]
        public string username { get; set; }

        [StringLength(250)]
        public string password { get; set; }

        public int role { get; set; }

        [StringLength(11)]
        public string phone { get; set; }

        [StringLength(250)]
        public string address { get; set; }

        [StringLength(10)]
        public string cmnd { get; set; }

        public int isDelete { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Login> Logins { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Product> Products { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Receipt> Receipts { get; set; }
    }
}
