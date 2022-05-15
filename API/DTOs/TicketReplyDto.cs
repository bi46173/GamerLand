using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class TicketReplyDto
    {
        public string Reply { get; set; }
        public DateTime ReplyDate { get; set; }

        public Boolean AdminReply { get; set; }
    }
}