using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {}

        public DbSet<AppUser> Users { get; set; }
      
        public DbSet<UserLike> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserLike>().HasKey(k => new { k.LikedUserId, k.SourceUserId });

            builder.Entity<UserLike>()
                .HasOne(userLike => userLike.SourceUser)
                .WithMany(appUser => appUser.LikedUsers)
                .HasForeignKey(userLike => userLike.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserLike>()
                .HasOne(userLike => userLike.LikedUser)
                .WithMany(appUser => appUser.LikedByUsers)
                .HasForeignKey(userLike => userLike.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);


        }  
    }
}