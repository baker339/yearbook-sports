using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YearbookSports.API.Data;
using YearbookSports.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
using YearbookSports.API.DTOs;

namespace YearbookSports.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly YearbookSportsContext _context;

        public TeamsController(YearbookSportsContext context)
        {
            _context = context;
        }

        // GET: api/teams
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TeamDto>>> GetTeams()
        {
            return await _context.Teams
                .Select(t => new TeamDto { Id = t.Id, Name = t.Name, LeagueId = t.LeagueId })
                .ToListAsync();
        }

        // GET: api/teams/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TeamDto>> GetTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound();
            return new TeamDto { Id = team.Id, Name = team.Name, LeagueId = team.LeagueId };
        }

        // POST: api/teams
        [HttpPost]
        public async Task<ActionResult<TeamDto>> CreateTeam(Team team)
        {
            // Look up the league to get the correct SportId
            var league = await _context.Leagues.FindAsync(team.LeagueId);
            if (league == null)
                return BadRequest("Invalid leagueId");

            team.SportId = league.SportId;

            _context.Teams.Add(team);
            await _context.SaveChangesAsync();

            var dto = new TeamDto { Id = team.Id, Name = team.Name, LeagueId = team.LeagueId };
            return CreatedAtAction(nameof(GetTeam), new { id = team.Id }, dto);
        }

        // PUT: api/teams/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, Team team)
        {
            if (id != team.Id) return BadRequest();

            // Look up the league to ensure it exists and get the correct SportId
            var league = await _context.Leagues.FindAsync(team.LeagueId);
            if (league == null)
                return BadRequest("Invalid leagueId");

            team.SportId = league.SportId;

            _context.Entry(team).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Teams.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/teams/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);
            if (team == null) return NotFound();
            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 