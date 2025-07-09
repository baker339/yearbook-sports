using Microsoft.EntityFrameworkCore;
using YearbookSports.API.Entities;

namespace YearbookSports.API.Data
{
    public class YearbookSportsContext : DbContext
    {
        public YearbookSportsContext(DbContextOptions<YearbookSportsContext> options) : base(options)
        {
        }

        // User-related entities
        public DbSet<User> Users { get; set; }
        public DbSet<UserFavorite> UserFavorites { get; set; }
        public DbSet<UserSubscription> UserSubscriptions { get; set; }
        public DbSet<UserPlayback> UserPlaybacks { get; set; }

        // Sports hierarchy entities
        public DbSet<Sport> Sports { get; set; }
        public DbSet<League> Leagues { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Player> Players { get; set; }

        // Content entities
        public DbSet<Article> Articles { get; set; }
        public DbSet<Podcast> Podcasts { get; set; }
        public DbSet<PodcastEpisode> PodcastEpisodes { get; set; }

        // Tagging system
        public DbSet<Tag> Tags { get; set; }
        public DbSet<ArticleTag> ArticleTags { get; set; }
        public DbSet<PodcastTag> PodcastTags { get; set; }

        // User interactions
        public DbSet<Comment> Comments { get; set; }

        // Advertising
        public DbSet<AdCampaign> AdCampaigns { get; set; }
        public DbSet<ArticleAd> ArticleAds { get; set; }
        public DbSet<PodcastAd> PodcastAds { get; set; }
        public DbSet<AdImpression> AdImpressions { get; set; }

        // Historical data
        public DbSet<TeamHistory> TeamHistories { get; set; }
        public DbSet<PlayerStats> PlayerStats { get; set; }
        public DbSet<PlayerHistory> PlayerHistories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // User configuration
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username).IsUnique();
                entity.HasIndex(e => e.Email).IsUnique();
            });

            // Sports hierarchy relationships
            modelBuilder.Entity<League>()
                .HasOne(l => l.Sport)
                .WithMany(s => s.Leagues)
                .HasForeignKey(l => l.SportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.Sport)
                .WithMany(s => s.Teams)
                .HasForeignKey(t => t.SportId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Team>()
                .HasOne(t => t.League)
                .WithMany(l => l.Teams)
                .HasForeignKey(t => t.LeagueId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Player>()
                .HasOne(p => p.Team)
                .WithMany(t => t.Players)
                .HasForeignKey(p => p.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Player>()
                .HasOne(p => p.Sport)
                .WithMany()
                .HasForeignKey(p => p.SportId)
                .OnDelete(DeleteBehavior.Restrict);

            // Content relationships
            modelBuilder.Entity<Article>()
                .HasOne(a => a.Author)
                .WithMany(u => u.Articles)
                .HasForeignKey(a => a.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Podcast>()
                .HasOne(p => p.Host)
                .WithMany(u => u.Podcasts)
                .HasForeignKey(p => p.HostId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PodcastEpisode>()
                .HasOne(pe => pe.Podcast)
                .WithMany(p => p.Episodes)
                .HasForeignKey(pe => pe.PodcastId)
                .OnDelete(DeleteBehavior.Cascade);

            // Tag relationships
            modelBuilder.Entity<ArticleTag>()
                .HasKey(at => new { at.ArticleId, at.TagId });

            modelBuilder.Entity<ArticleTag>()
                .HasOne(at => at.Article)
                .WithMany(a => a.Tags)
                .HasForeignKey(at => at.ArticleId);

            modelBuilder.Entity<ArticleTag>()
                .HasOne(at => at.Tag)
                .WithMany(t => t.ArticleTags)
                .HasForeignKey(at => at.TagId);

            modelBuilder.Entity<PodcastTag>()
                .HasKey(pt => new { pt.PodcastId, pt.TagId });

            modelBuilder.Entity<PodcastTag>()
                .HasOne(pt => pt.Podcast)
                .WithMany(p => p.Tags)
                .HasForeignKey(pt => pt.PodcastId);

            modelBuilder.Entity<PodcastTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(t => t.PodcastTags)
                .HasForeignKey(pt => pt.TagId);

            // Comment relationships
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Comment>()
                .HasOne(c => c.ParentComment)
                .WithMany(c => c.Replies)
                .HasForeignKey(c => c.ParentCommentId)
                .OnDelete(DeleteBehavior.Restrict);

            // User interaction relationships
            modelBuilder.Entity<UserFavorite>()
                .HasOne(uf => uf.User)
                .WithMany(u => u.Favorites)
                .HasForeignKey(uf => uf.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserSubscription>()
                .HasOne(us => us.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(us => us.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserPlayback>()
                .HasOne(up => up.User)
                .WithMany()
                .HasForeignKey(up => up.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserPlayback>()
                .HasOne(up => up.PodcastEpisode)
                .WithMany(pe => pe.Playbacks)
                .HasForeignKey(up => up.PodcastEpisodeId)
                .OnDelete(DeleteBehavior.Cascade);

            // Advertising relationships
            modelBuilder.Entity<ArticleAd>()
                .HasOne(aa => aa.Article)
                .WithMany(a => a.Ads)
                .HasForeignKey(aa => aa.ArticleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<ArticleAd>()
                .HasOne(aa => aa.AdCampaign)
                .WithMany(ac => ac.ArticleAds)
                .HasForeignKey(aa => aa.AdCampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PodcastAd>()
                .HasOne(pa => pa.Podcast)
                .WithMany(p => p.Ads)
                .HasForeignKey(pa => pa.PodcastId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PodcastAd>()
                .HasOne(pa => pa.AdCampaign)
                .WithMany(ac => ac.PodcastAds)
                .HasForeignKey(pa => pa.AdCampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AdImpression>()
                .HasOne(ai => ai.AdCampaign)
                .WithMany(ac => ac.Impressions)
                .HasForeignKey(ai => ai.AdCampaignId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AdImpression>()
                .HasOne(ai => ai.User)
                .WithMany()
                .HasForeignKey(ai => ai.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            // Historical data relationships
            modelBuilder.Entity<TeamHistory>()
                .HasOne(th => th.Team)
                .WithMany(t => t.History)
                .HasForeignKey(th => th.TeamId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlayerStats>()
                .HasOne(ps => ps.Player)
                .WithMany(p => p.Statistics)
                .HasForeignKey(ps => ps.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlayerStats>()
                .HasOne(ps => ps.Team)
                .WithMany()
                .HasForeignKey(ps => ps.TeamId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PlayerHistory>()
                .HasOne(ph => ph.Player)
                .WithMany(p => p.History)
                .HasForeignKey(ph => ph.PlayerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PlayerHistory>()
                .HasOne(ph => ph.Team)
                .WithMany()
                .HasForeignKey(ph => ph.TeamId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
} 