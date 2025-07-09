using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class AdCampaign
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public string? VideoUrl { get; set; }
        
        public string? TargetUrl { get; set; }
        
        public AdType Type { get; set; }
        
        public AdPlacement Placement { get; set; }
        
        public DateTime StartDate { get; set; }
        
        public DateTime EndDate { get; set; }
        
        public decimal Budget { get; set; }
        
        public decimal Spent { get; set; } = 0;
        
        public int Impressions { get; set; } = 0;
        
        public int Clicks { get; set; } = 0;
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<ArticleAd> ArticleAds { get; set; } = new List<ArticleAd>();
        public virtual ICollection<PodcastAd> PodcastAds { get; set; } = new List<PodcastAd>();
        public virtual ICollection<AdImpression> Impressions { get; set; } = new List<AdImpression>();
    }
    
    public class ArticleAd
    {
        public int Id { get; set; }
        
        public int ArticleId { get; set; }
        
        public int AdCampaignId { get; set; }
        
        public AdPosition Position { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Article Article { get; set; } = null!;
        public virtual AdCampaign AdCampaign { get; set; } = null!;
    }
    
    public class PodcastAd
    {
        public int Id { get; set; }
        
        public int PodcastId { get; set; }
        
        public int AdCampaignId { get; set; }
        
        public AdPosition Position { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Podcast Podcast { get; set; } = null!;
        public virtual AdCampaign AdCampaign { get; set; } = null!;
    }
    
    public class AdImpression
    {
        public int Id { get; set; }
        
        public int AdCampaignId { get; set; }
        
        public int? UserId { get; set; }
        
        public string? IpAddress { get; set; }
        
        public string? UserAgent { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual AdCampaign AdCampaign { get; set; } = null!;
        public virtual User? User { get; set; }
    }
    
    public enum AdType
    {
        Banner = 0,
        Video = 1,
        Audio = 2,
        Sponsored = 3
    }
    
    public enum AdPlacement
    {
        Header = 0,
        Sidebar = 1,
        Inline = 2,
        Footer = 3,
        MediaPlayer = 4
    }
    
    public enum AdPosition
    {
        Top = 0,
        Middle = 1,
        Bottom = 2,
        Sidebar = 3
    }
} 