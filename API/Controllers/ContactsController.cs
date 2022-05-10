using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ContactsController : BaseApiController
    {
        private readonly StoreContext _context;

        public ContactsController(StoreContext context)
        {
            _context = context;
            
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<ActionResult<List<Contact>>> GetContacts(){
            
            return await _context.Contacts.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Contact>> CreateContact(CreateContactsDto createContactDto){
            var contact = new Contact{
                Subject = createContactDto.Subject,
                Email = createContactDto.Email,
                Description = createContactDto.Description
            };
            _context.Contacts.Add(contact);
            var result = await _context.SaveChangesAsync() > 0;

            if(result) return StatusCode(201);

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);

            if(contact == null) return NotFound();

            _context.Contacts.Remove(contact);

            var result = await _context.SaveChangesAsync() > 0;

            if(result) return Ok();

            return BadRequest(new ProblemDetails{Title="Something went wrong"});
        }

        
    }
}