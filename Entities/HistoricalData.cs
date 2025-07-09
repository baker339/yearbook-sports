using System.ComponentModel.DataAnnotations;

namespace YearbookSports.API.Entities
{
    public class TeamHistory
    {
        public int Id { get; set; }
        
        public int TeamId { get; set; }
        
        public int Season { get; set; }
        
        public int Wins { get; set; }
        
        public int Losses { get; set; }
        
        public int? Ties { get; set; }
        
        public decimal WinPercentage { get; set; }
        
        public int? PointsFor { get; set; }
        
        public int? PointsAgainst { get; set; }
        
        public int? GoalsFor { get; set; }
        
        public int? GoalsAgainst { get; set; }
        
        public string? PlayoffResult { get; set; }
        
        public string? ChampionshipResult { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Team Team { get; set; } = null!;
    }
    
    public class PlayerStats
    {
        public int Id { get; set; }
        
        public int PlayerId { get; set; }
        
        public int Season { get; set; }
        
        public int TeamId { get; set; }
        
        // Baseball stats
        public int? GamesPlayed { get; set; }
        public int? AtBats { get; set; }
        public int? Hits { get; set; }
        public int? HomeRuns { get; set; }
        public int? RBIs { get; set; }
        public decimal? BattingAverage { get; set; }
        public decimal? OnBasePercentage { get; set; }
        public decimal? SluggingPercentage { get; set; }
        
        // Basketball stats
        public int? GamesStarted { get; set; }
        public decimal? PointsPerGame { get; set; }
        public decimal? ReboundsPerGame { get; set; }
        public decimal? AssistsPerGame { get; set; }
        public decimal? StealsPerGame { get; set; }
        public decimal? BlocksPerGame { get; set; }
        public decimal? FieldGoalPercentage { get; set; }
        public decimal? ThreePointPercentage { get; set; }
        public decimal? FreeThrowPercentage { get; set; }
        
        // Football stats
        public int? PassingYards { get; set; }
        public int? PassingTouchdowns { get; set; }
        public int? Interceptions { get; set; }
        public int? RushingYards { get; set; }
        public int? RushingTouchdowns { get; set; }
        public int? Receptions { get; set; }
        public int? ReceivingYards { get; set; }
        public int? ReceivingTouchdowns { get; set; }
        public int? Tackles { get; set; }
        public int? Sacks { get; set; }
        
        // Hockey stats
        public int? Goals { get; set; }
        public int? Assists { get; set; }
        public int? Points { get; set; }
        public int? PenaltyMinutes { get; set; }
        public decimal? SavePercentage { get; set; }
        public decimal? GoalsAgainstAverage { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Player Player { get; set; } = null!;
        public virtual Team Team { get; set; } = null!;
    }
    
    public class PlayerHistory
    {
        public int Id { get; set; }
        
        public int PlayerId { get; set; }
        
        public int TeamId { get; set; }
        
        public int Season { get; set; }
        
        public string? TransactionType { get; set; } // Draft, Trade, Free Agency, etc.
        
        public DateTime TransactionDate { get; set; }
        
        public string? Details { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        public virtual Player Player { get; set; } = null!;
        public virtual Team Team { get; set; } = null!;
    }
} 