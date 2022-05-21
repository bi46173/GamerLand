import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Card,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useForm, FieldValues } from "react-hook-form";
import { useParams } from "react-router-dom";
import agent from "../../../app/api/agent";
import AppTextInput from "../../../app/components/AppTextInput";
import NotFound from "../../../app/errors/NotFound";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import Ticket from "../../../app/models/ticket";
import MessageLeft from "../../support/MessageLeft";
import MessageRight from "../../support/MessageRight";
import { format } from "date-fns";
import SendIcon from "@mui/icons-material/Send";

export default function AdminViewing() {
  const { id } = useParams<{ id: any }>();
  const [loading, setLoading] = useState(true);
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [triggerChange, setTriggerChange] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    agent.Support.getTicket(parseInt(id))
      .then((response) => setTicket(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [triggerChange, id]);

  async function handleSubmitData(data: FieldValues) {
    try {
      data.id = parseInt(id);
      await agent.Support.replyTicket(data);
      setTriggerChange(triggerChange + 1);
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <LoadingComponent message="Loading ticket..." />;
  if (!ticket) return <NotFound />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, pb: 8 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Subject: {ticket?.subject!}</TableCell>
              <TableCell align="right">Problem: {ticket?.problem!}</TableCell>
              <TableCell align="right">
                Date:
                {format(new Date(ticket?.ticketDate!), "dd MMMM yyyy HH:mm")}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      {ticket.replies.map((reply: any) => {
        return reply.adminReply ? (
          <MessageLeft
            key={"id" + Math.random().toString(16).slice(2)}
            reply={reply.reply}
            replyDate={reply.replyDate}
          />
        ) : (
          <MessageRight
            key={"id" + Math.random().toString(16).slice(2)}
            reply={reply.reply}
            replyDate={reply.replyDate}
          />
        );
      })}
      <Card sx={{ p: 3 }}>
        <form onSubmit={handleSubmit(handleSubmitData)}>
          <AppTextInput
            multiline
            control={control}
            rows={3}
            label="Reply"
            name="reply"
          />
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 1 }}
          >
            <SendIcon />
          </LoadingButton>
        </form>
      </Card>
    </>
  );
}
