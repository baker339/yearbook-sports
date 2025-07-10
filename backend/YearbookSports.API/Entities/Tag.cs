using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Tag
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(200)]
        public string? Description { get; set; }
        
        public string? Color { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual ICollection<ArticleTag> ArticleTags { get; set; } = new List<ArticleTag>();
        public virtual ICollection<PodcastTag> PodcastTags { get; set; } = new List<PodcastTag>();
    }
    
    public class ArticleTag
    {
        public int ArticleId { get; set; }
        
        public int TagId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Article Article { get; set; } = null!;
        public virtual Tag Tag { get; set; } = null!;
    }
    
    public class PodcastTag
    {
        public int PodcastId { get; set; }
        
        public int TagId { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Podcast Podcast { get; set; } = null!;
        public virtual Tag Tag { get; set; } = null!;
    }
} 