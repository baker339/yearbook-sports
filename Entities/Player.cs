using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class Player
    {
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        [StringLength(10)]
        public string? JerseyNumber { get; set; }
        
        [StringLength(50)]
        public string? Position { get; set; }
        
        public DateTime? DateOfBirth { get; set; }
        
        public string? Height { get; set; }
        
        public string? Weight { get; set; }
        
        public string? ProfileImageUrl { get; set; }
        
        [StringLength(500)]
        public string? Bio { get; set; }
        
        public int TeamId { get; set; }
        
        public int SportId { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        public DateTime? UpdatedAt { get; set; }
        
        // Navigation properties
        public virtual Team Team { get; set; } = null!;
        public virtual Sport Sport { get; set; } = null!;
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Podcast> Podcasts { get; set; } = new List<Podcast>();
        public virtual ICollection<PlayerStats> Statistics { get; set; } = new List<PlayerStats>();
        public virtual ICollection<PlayerHistory> History { get; set; } = new List<PlayerHistory>();
    }
} 