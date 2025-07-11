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
    public class PlayersController : ControllerBase
    {
        private readonly YearbookSportsContext _context;

        public PlayersController(YearbookSportsContext context)
        {
            _context = context;
        }

        // GET: api/players
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlayerDto>>> GetPlayers()
        {
            return await _context.Players
                .Select(p => new PlayerDto { Id = p.Id, FirstName = p.FirstName, LastName = p.LastName, TeamId = p.TeamId })
                .ToListAsync();
        }

        // GET: api/players/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<PlayerDto>> GetPlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null) return NotFound();
            return new PlayerDto { Id = player.Id, FirstName = player.FirstName, LastName = player.LastName, TeamId = player.TeamId };
        }

        // POST: api/players
        [HttpPost]
        public async Task<ActionResult<PlayerDto>> CreatePlayer(Player player)
        {
            // Look up the team to ensure it exists and get the correct SportId
            var team = await _context.Teams.FindAsync(player.TeamId);
            if (team == null)
                return BadRequest("Invalid teamId");

            player.SportId = team.SportId;

            _context.Players.Add(player);
            await _context.SaveChangesAsync();

            var dto = new PlayerDto { Id = player.Id, FirstName = player.FirstName, LastName = player.LastName, TeamId = player.TeamId };
            return CreatedAtAction(nameof(GetPlayer), new { id = player.Id }, dto);
        }

        // PUT: api/players/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlayer(int id, Player player)
        {
            if (id != player.Id) return BadRequest();

            // Look up the team to ensure it exists and get the correct SportId
            var team = await _context.Teams.FindAsync(player.TeamId);
            if (team == null)
                return BadRequest("Invalid teamId");

            player.SportId = team.SportId;

            _context.Entry(player).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Players.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/players/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlayer(int id)
        {
            var player = await _context.Players.FindAsync(id);
            if (player == null) return NotFound();
            _context.Players.Remove(player);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 