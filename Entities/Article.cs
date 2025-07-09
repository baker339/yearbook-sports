using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Article
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Excerpt { get; set; }
        
        public string? FeaturedImageUrl { get; set; }
        
        public ArticleStatus Status { get; set; } = ArticleStatus.Draft;
        
        public ContentTier Tier { get; set; } = ContentTier.Free;
        
        public int AuthorId { get; set; }
        
        public int? SportId { get; set; }
        
        public int? LeagueId { get; set; }
        
        public int? TeamId { get; set; }
        
        public int? PlayerId { get; set; }
        
        public DateTime? PublishedAt { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public int ViewCount { get; set; } = 0;
        
        public int LikeCount { get; set; } = 0;
        
        public int CommentCount { get; set; } = 0;
        
        // Navigation properties
        public virtual User Author { get; set; } = null!;
        public virtual Sport? Sport { get; set; }
        public virtual League? League { get; set; }
        public virtual Team? Team { get; set; }
        public virtual Player? Player { get; set; }
        public virtual ICollection<ArticleTag> Tags { get; set; } = new List<ArticleTag>();
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();
        public virtual ICollection<ArticleAd> Ads { get; set; } = new List<ArticleAd>();
    }
    
    public enum ArticleStatus
    {
        Draft = 0,
        Review = 1,
        Published = 2,
        Archived = 3
    }
    
    public enum ContentTier
    {
        Free = 0,
        Premium = 1,
        Subscription = 2
    }
} 