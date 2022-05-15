using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{

    [Table("SupportTicketReplies")]
    public class SupportTicketReply
    {
        public int Id { get; set; }
        public string Reply { get; set; }
        public DateTime ReplyDate { get; set; } = DateTime.Now;

        public Boolean AdminReply { get; set; }
        public int SupportTicketId { get; set; }
        public SupportTicket SupportTicket { get; set; }

    }
}