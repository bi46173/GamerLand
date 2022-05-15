using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateSupportTicketDto
    {
        public string Subject { get; set; }
        public string Urgency { get; set; }
        public string Problem { get; set; }
    }
}