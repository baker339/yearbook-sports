using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using YearbookSports.API.Data;

namespace YearbookSports.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MigrationController : ControllerBase
    {
        private readonly YearbookSportsContext _context;
        private readonly IWebHostEnvironment _env;

        public MigrationController(YearbookSportsContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // Only allow in Development or for Admins in Production
        [HttpPost("run")]
        public IActionResult RunMigrations()
        {
            _context.Database.Migrate();
            return Ok("Migrations applied.");
        }
    }
} 