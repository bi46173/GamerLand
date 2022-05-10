using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Contact
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Email { get; set; }
        public string Description { get; set; }
        public DateTime ContactDate { get; set; } = DateTime.Now;
    }
}