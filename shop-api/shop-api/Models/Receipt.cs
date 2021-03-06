namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Receipt")]
    public partial class Receipt
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Receipt()
        {
            DetailReciepts = new HashSet<DetailReciept>();
        }

        [Key]
        public int idReceipt { get; set; }

        [Required]
        [StringLength(250)]
        public string nameCustomer { get; set; }

        [Required]
        [StringLength(250)]
        public string address { get; set; }

        [Required]
        [StringLength(11)]
        public string phone { get; set; }

        [Column(TypeName = "text")]
        public string description { get; set; }

        public decimal total { get; set; }

        public int status { get; set; }

        public int? idUpdator { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetailReciept> DetailReciepts { get; set; }

        public virtual User User { get; set; }
    }
}
