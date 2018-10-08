namespace shop_api.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Product")]
    public partial class Product
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Product()
        {
            DetailReciepts = new HashSet<DetailReciept>();
        }

        [Key]
        public int idProduct { get; set; }

        public int? idCategory { get; set; }

        [Required]
        [StringLength(50)]
        public string code { get; set; }

        [Required]
        [StringLength(250)]
        public string name { get; set; }

        public decimal? length { get; set; }

        public decimal? width { get; set; }

        public decimal? high { get; set; }

        public decimal price { get; set; }

        [StringLength(250)]
        public string madein { get; set; }

        public int quantity { get; set; }

        [Column(TypeName = "text")]
        public string description { get; set; }

        [StringLength(250)]
        public string avatar { get; set; }

        [Column(TypeName = "text")]
        public string images { get; set; }

        public int idCreator { get; set; }

        public int isDelete { get; set; }

        public DateTime createdDate { get; set; }

        public DateTime updatedDate { get; set; }

        public virtual Category Category { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<DetailReciept> DetailReciepts { get; set; }

        public virtual User User { get; set; }
    }
}
