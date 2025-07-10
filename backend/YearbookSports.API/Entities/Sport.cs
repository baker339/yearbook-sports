using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Sport
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public string? LogoUrl { get; set; }
        
        public string? BannerImageUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual ICollection<League> Leagues { get; set; } = new List<League>();
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Podcast> Podcasts { get; set; } = new List<Podcast>();
        public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
    }
} 