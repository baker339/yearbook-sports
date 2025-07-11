using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YearbookSports.API.Data;
using YearbookSports.API.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace YearbookSports.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaguesController : ControllerBase
    {
        private readonly YearbookSportsContext _context;

        public LeaguesController(YearbookSportsContext context)
        {
            _context = context;
        }

        // GET: api/leagues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<League>>> GetLeagues()
        {
            return await _context.Leagues.ToListAsync();
        }

        // GET: api/leagues/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<League>> GetLeague(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league == null) return NotFound();
            return league;
        }

        // POST: api/leagues
        [HttpPost]
        public async Task<ActionResult<League>> CreateLeague(League league)
        {
            _context.Leagues.Add(league);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLeague), new { id = league.Id }, league);
        }

        // PUT: api/leagues/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLeague(int id, League league)
        {
            if (id != league.Id) return BadRequest();
            _context.Entry(league).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Leagues.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/leagues/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeague(int id)
        {
            var league = await _context.Leagues.FindAsync(id);
            if (league == null) return NotFound();
            _context.Leagues.Remove(league);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 