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
    public class SportsController : ControllerBase
    {
        private readonly YearbookSportsContext _context;

        public SportsController(YearbookSportsContext context)
        {
            _context = context;
        }

        // GET: api/sports
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sport>>> GetSports()
        {
            return await _context.Sports.ToListAsync();
        }

        // GET: api/sports/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Sport>> GetSport(int id)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null) return NotFound();
            return sport;
        }

        // POST: api/sports
        [HttpPost]
        public async Task<ActionResult<Sport>> CreateSport(Sport sport)
        {
            _context.Sports.Add(sport);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetSport), new { id = sport.Id }, sport);
        }

        // PUT: api/sports/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSport(int id, Sport sport)
        {
            if (id != sport.Id) return BadRequest();
            _context.Entry(sport).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Sports.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/sports/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSport(int id)
        {
            var sport = await _context.Sports.FindAsync(id);
            if (sport == null) return NotFound();
            _context.Sports.Remove(sport);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
} 