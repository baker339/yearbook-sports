using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class League
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
        [StringLength(500)]
        public string? Description { get; set; }
        public string? LogoUrl { get; set; }
        public string? BannerImageUrl { get; set; }
        public int SportId { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
        public virtual Sport Sport { get; set; } = null!;
        public virtual ICollection<Team> Teams { get; set; } = new List<Team>();
        public virtual ICollection<Article> Articles { get; set; } = new List<Article>();
        public virtual ICollection<Podcast> Podcasts { get; set; } = new List<Podcast>();
    }
} 