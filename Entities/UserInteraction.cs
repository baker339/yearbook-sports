using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class UserFavorite
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        
        public int? ArticleId { get; set; }
        
        public int? PodcastId { get; set; }
        
        public int? TeamId { get; set; }
        
        public int? PlayerId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual Article? Article { get; set; }
        public virtual Podcast? Podcast { get; set; }
        public virtual Team? Team { get; set; }
        public virtual Player? Player { get; set; }
    }
    
    public class UserSubscription
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        
        public SubscriptionTier Tier { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public decimal Amount { get; set; }
        
        public string? PaymentMethod { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
    }
    
    public class UserPlayback
    {
        public int Id { get; set; }
        
        public int UserId { get; set; }
        
        public int PodcastEpisodeId { get; set; }
        
        public int CurrentPosition { get; set; } // in seconds
        
        public bool IsCompleted { get; set; } = false;
        
        public DateTime LastPlayedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual PodcastEpisode PodcastEpisode { get; set; } = null!;
    }
    
    public enum SubscriptionTier
    {
        Free = 0,
        Basic = 1,
        Premium = 2,
        Pro = 3
    }
} 