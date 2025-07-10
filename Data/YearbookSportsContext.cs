using Microsoft.EntityFrameworkCore;
using YearbookSports.API.Entities;

namespace YearbookSports.API.Data
{
    public class YearbookSportsContext : DbContext
    {
        public YearbookSportsContext(DbContextOptions<YearbookSportsContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }
        public DbSet<UserPlayback> UserPlaybacks { get; set; }
        public DbSet<Sport> Sports { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<PodcastEpisode> PodcastEpisodes { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ArticleTag> ArticleTags { get; set; }
        public DbSet<PodcastTag> PodcastTags { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<AdCampaign> AdCampaigns { get; set; }
        public DbSet<ArticleAd> ArticleAds { get; set; }
        public DbSet<PodcastAd> PodcastAds { get; set; }
        public DbSet<AdImpression> AdImpressions { get; set; }
        public DbSet<TeamHistory> TeamHistories { get; set; }
        public DbSet<PlayerStats> PlayerStats { get; set; }
        public DbSet<PlayerHistory> PlayerHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Fix AdImpression relationship
            modelBuilder.Entity<AdImpression>()
                .HasOne(ai => ai.AdCampaign)
                .WithMany(ac => ac.AdImpressionRecords)
                .HasForeignKey(ai => ai.AdCampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            // (Other relationship configs would go here)
        }
    }
} 