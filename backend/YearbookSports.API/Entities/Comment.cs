using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        
        [Required]
        public string Content { get; set; } = string.Empty;
        
        public int UserId { get; set; }
        
        public int? ArticleId { get; set; }
        
        public int? PodcastEpisodeId { get; set; }
        
        public int? ParentCommentId { get; set; }
        
        public bool IsApproved { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        public int LikeCount { get; set; } = 0;
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
        public virtual Article? Article { get; set; }
        public virtual PodcastEpisode? PodcastEpisode { get; set; }
        public virtual Comment? ParentComment { get; set; }
        public virtual ICollection<Comment> Replies { get; set; } = new List<Comment>();
    }
} 