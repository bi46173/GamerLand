using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TicketDto
    {
        public int Id { get; set; }

        public string Subject { get; set; }
        public string Urgency { get; set; }
        public string Problem { get; set; }

        public string User { get; set; }
        public DateTime TicketDate { get; set; }
        public List<TicketReplyDto> Replies { get; set; }

    }
}