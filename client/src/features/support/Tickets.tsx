import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppSelector } from "../../app/store/configureStore";
import CreateTicket from "./CreateTicket";

export default function Tickets() {
  const {
    user: { user },
  }: { user: any } = useAppSelector((state) => state.account);
  const [tickets, setTickets] = useState<any[]>([]);
  const [ticketsChange, setTicketsChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dButton, setDButton] = useState(false);
  const [target, setTarget] = useState(0);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    agent.Support.listTickets(user)
      .then((response) => setTickets(response))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [ticketsChange, user]);

  function handleDeleteTicket(id: number) {
    setDButton(true);
    setTarget(id);
    agent.Support.deleteTicket(id)
      .catch((error) => console.log(error))
      .finally(() => {
        setDButton(false);
        setTarget(0);
        setTicketsChange(ticketsChange + 1);
      });
  }

  if (loading) return <LoadingComponent message="Loading tickets" />;
  if (creating) return <CreateTicket />;

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} variant="h4">
          Tickets
        </Typography>
        <Button
          onClick={() => setCreating(true)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          New
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Ticket number</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Urgency</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets?.map((ticket) => (
              <TableRow
                key={ticket.id}
                sx={{ "&:last-child td, &:last-child th": { bticket: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {ticket.id}
                </TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>{ticket.urgency}</TableCell>
                <TableCell>{ticket.ticketDate.split("T")[0]}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/support/${ticket.id}`}>
                    View
                  </Button>
                  <LoadingButton
                    loading={dButton && target === ticket.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteTicket(ticket.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
