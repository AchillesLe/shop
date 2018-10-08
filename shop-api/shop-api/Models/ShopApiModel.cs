namespace shop_api.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ShopApiModel : DbContext
    {
        public ShopApiModel()
            : base("name=ShopApiConnection")
        {
        }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<DetailReciept> DetailReciepts { get; set; }
        public virtual DbSet<Login> Logins { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Receipt> Receipts { get; set; }
        public virtual DbSet<sysdiagram> sysdiagrams { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>()
                .Property(e => e.name)
                .IsUnicode(false);

            modelBuilder.Entity<DetailReciept>()
                .Property(e => e.price)
                .HasPrecision(18, 0);

            modelBuilder.Entity<Login>()
                .Property(e => e.token)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.code)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.name)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.length)
                .HasPrecision(6, 1);

            modelBuilder.Entity<Product>()
                .Property(e => e.width)
                .HasPrecision(6, 1);

            modelBuilder.Entity<Product>()
                .Property(e => e.high)
                .HasPrecision(6, 1);

            modelBuilder.Entity<Product>()
                .Property(e => e.price)
                .HasPrecision(10, 0);

            modelBuilder.Entity<Product>()
                .Property(e => e.madein)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.description)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.avatarssss)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .Property(e => e.images)
                .IsUnicode(false);

            modelBuilder.Entity<Product>()
                .HasMany(e => e.DetailReciepts)
                .WithRequired(e => e.Product)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.nameCustomer)
                .IsUnicode(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.address)
                .IsUnicode(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.phone)
                .IsUnicode(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.description)
                .IsUnicode(false);

            modelBuilder.Entity<Receipt>()
                .Property(e => e.total)
                .HasPrecision(15, 0);

            modelBuilder.Entity<Receipt>()
                .HasMany(e => e.DetailReciepts)
                .WithRequired(e => e.Receipt)
                .HasForeignKey(e => e.idReciept)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .Property(e => e.fullName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.userName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.password)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Logins)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Products)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.idCreator)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Receipts)
                .WithOptional(e => e.User)
                .HasForeignKey(e => e.idUpdator);
        }
    }
}
