using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class SupportTicketController : BaseApiController
    {
        private readonly StoreContext _context;
        public SupportTicketController(StoreContext context)
        {
            _context = context;
            
        }

        [HttpGet("getTicketsAdmin/")]

        public async Task<ActionResult<List<SupportTicket>>> GetTicketsAdmin(){

            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            bool isAdmin = roles.Contains("Admin");

            if(!isAdmin) return Unauthorized();

            var tickets = await _context.SupportTickets
                                .ToListAsync();
            return tickets;
        }

        [HttpGet("getTicketsByUser/{userName}",Name="GetTicketsByUser")]

        public async Task<ActionResult<List<SupportTicket>>> GetTicketsByUser(string userName){

            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            bool isAdmin = roles.Contains("Admin");

            bool isAllowed = userName == User.Identity.Name || isAdmin;

            if(!isAllowed) return BadRequest();

            var tickets = await _context.SupportTickets
                                .Where(t => t.User == userName)
                                .ToListAsync();
            return tickets;
        }

        [HttpGet("{id}", Name = "GetTicket")]
        public async Task<ActionResult<TicketDto>> GetTicket(int id)
        {
            var ticket = await _context.SupportTickets
                .Include(t => t.Replies)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (ticket == null) return NotFound();

            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            bool isAdmin = roles.Contains("Admin");

            bool isAllowed = ticket.User == User.Identity.Name || isAdmin;

            if(!isAllowed) return Unauthorized();

            return MapTicketToDto(ticket);
        }

        [HttpPost("openTicket")]
        public async Task<ActionResult> CreateSupportTicket(CreateSupportTicketDto ticket)
        {
            var supportTicket = new SupportTicket{
                Subject = ticket.Subject,
                Urgency = ticket.Urgency,
                Problem = ticket.Problem,
                User = User.Identity.Name
            };

            _context.SupportTickets.Add(supportTicket);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return StatusCode(200);

            return StatusCode(204);
        }

        [HttpPost("reply")]
        public async Task<ActionResult> ReplyToTicket(ReplyTicketDto reply){
            
            var ticket = await _context.SupportTickets
                                        .Include(t => t.Replies)
                                        .FirstOrDefaultAsync(x=> x.Id == reply.Id);

            if(ticket == null) return BadRequest();
            var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            bool isAdmin = roles.Contains("Admin");
            bool isAllowed = ticket.User == User.Identity.Name || isAdmin;
            
            if (!isAllowed) return Unauthorized();


            ticket.AddReply(isAdmin,reply.Reply);
            // save changes
            var result = await _context.SaveChangesAsync() > 0;
            if(result) return CreatedAtRoute("GetTicket",new {id = reply.Id},MapTicketToDto(ticket));

            return BadRequest(new ProblemDetails{Title="Problem replying to this ticket"});
        
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTicket(int id)
        {
            var ticket = await _context.SupportTickets.FindAsync(id);
            
            if(ticket == null) return NotFound();

                var roles = ((ClaimsIdentity)User.Identity).Claims
                .Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value);

            bool isAdmin = roles.Contains("Admin");

            bool isAllowed = ticket.User == User.Identity.Name || isAdmin;

            if(!isAllowed) return Unauthorized();

            _context.SupportTickets.Remove(ticket);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails{Title="Problem removing ticket"});
        }

        private TicketDto MapTicketToDto(SupportTicket ticket)
        {
            return new TicketDto
            {
                Id = ticket.Id,
                Subject = ticket.Subject,
                Urgency = ticket.Urgency,
                Problem = ticket.Problem,
                User = ticket.User,
                TicketDate = ticket.TicketDate,
                Replies = ticket.Replies.Select(reply => new TicketReplyDto
                {
                    Reply = reply.Reply,
                    ReplyDate = reply.ReplyDate,
                    AdminReply = reply.AdminReply
                }).ToList()
            };
        }

        
    }
}