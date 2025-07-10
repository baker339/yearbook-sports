using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Podcast
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public string? CoverImageUrl { get; set; }
        
        public string? BannerImageUrl { get; set; }
        
        public ContentTier Tier { get; set; } = ContentTier.Free;
        
        public int HostId { get; set; }
        
        public int? SportId { get; set; }
        
        public int? LeagueId { get; set; }
        
        public int? TeamId { get; set; }
        
        public int? PlayerId { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public int TotalEpisodes { get; set; } = 0;
        
        public int TotalListeners { get; set; } = 0;
        
        public double AverageRating { get; set; } = 0.0;
        
        public int RatingCount { get; set; } = 0;
        
        // Navigation properties
        public virtual User Host { get; set; } = null!;
        public virtual Sport? Sport { get; set; }
        public virtual League? League { get; set; }
        public virtual Team? Team { get; set; }
        public virtual Player? Player { get; set; }
        public virtual ICollection<PodcastEpisode> Episodes { get; set; } = new List<PodcastEpisode>();
        public virtual ICollection<PodcastTag> Tags { get; set; } = new List<PodcastTag>();
        public virtual ICollection<PodcastAd> Ads { get; set; } = new List<PodcastAd>();
    }
    
    public class PodcastEpisode
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        [Required]
        public string AudioUrl { get; set; } = string.Empty;
        
        public string? ThumbnailUrl { get; set; }
        
        public int Duration { get; set; } // in seconds
        
        public int EpisodeNumber { get; set; }
        
        public int PodcastId { get; set; }
        
        public EpisodeStatus Status { get; set; } = EpisodeStatus.Draft;
        
        public DateTime? PublishedAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public int PlayCount { get; set; } = 0;
        
        public int LikeCount { get; set; } = 0;
        
        public int CommentCount { get; set; } = 0;
        
        // Navigation properties
        public virtual Podcast Podcast { get; set; } = null!;
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<UserPlayback> Playbacks { get; set; } = new List<UserPlayback>();
    }
    
    public enum EpisodeStatus
    {
        Draft = 0,
        Processing = 1,
        Published = 2,
        Archived = 3
    }
} 