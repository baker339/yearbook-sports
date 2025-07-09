using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Username { get; set; } = string.Empty;
        
        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [StringLength(100)]
        public string? FirstName { get; set; }
        
        [StringLength(100)]
        public string? LastName { get; set; }
        
        public UserRole Role { get; set; } = UserRole.User;
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? LastLoginAt { get; set; }
        
        public string? ProfileImageUrl { get; set; }
        
        public string? Bio { get; set; }
        
        // Navigation properties
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Podcast> Podcasts { get; set; } = new List<Podcast>();
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<UserFavorite> Favorites { get; set; } = new List<UserFavorite>();
        public virtual ICollection<UserSubscription> Subscriptions { get; set; } = new List<UserSubscription>();
    }
    
    public enum UserRole
    {
        User = 0,
        ContentCreator = 1,
        Admin = 2
    }
} 