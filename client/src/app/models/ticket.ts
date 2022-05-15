export interface Reply {
  reply: string;
  replyDate: Date;
  adminReply: boolean;
}

export default interface Ticket {
  id: number;
  subject: string;
  urgency: string;
  problem: string;
  user: string;
  ticketDate: Date;
  replies: Reply[];
}
