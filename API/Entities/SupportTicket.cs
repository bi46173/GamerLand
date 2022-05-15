using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class SupportTicket
    {
        public int Id { get; set; }

        public string Subject { get; set; }
        public string Urgency { get; set; }
        public string Problem { get; set; }

        public string User { get; set; }
        public DateTime TicketDate { get; set; } = DateTime.Now;

        public List<SupportTicketReply> Replies { get; set; } = new();

        public void AddReply(Boolean isAdmin,string reply){
            var existingReply = Replies.FirstOrDefault(item => item.Reply == reply);
            if(existingReply == null){
                Replies.Add(new SupportTicketReply{AdminReply = isAdmin,Reply = reply});
            }
        }

        public void RemoveItem(string reply){
            var item = Replies.FirstOrDefault(item => item.Reply == reply);
            if(item == null) return;
            Replies.Remove(item);
        }
    }
}