using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Team
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        
        [StringLength(10)]
        public string? Abbreviation { get; set; }
        
        [StringLength(500)]
        public string? Description { get; set; }
        
        public string? LogoUrl { get; set; }
        
        public string? BannerImageUrl { get; set; }
        
        public string? City { get; set; }
        
        public string? State { get; set; }
        
        public string? Country { get; set; }
        
        public int SportId { get; set; }
        
        public int LeagueId { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual Sport Sport { get; set; } = null!;
        public virtual League League { get; set; } = null!;
        public virtual ICollection<Player> Players { get; set; } = new List<Player>();
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Podcast> Podcasts { get; set; } = new List<Podcast>();
        public virtual ICollection<TeamHistory> History { get; set; } = new List<TeamHistory>();
    }
} 