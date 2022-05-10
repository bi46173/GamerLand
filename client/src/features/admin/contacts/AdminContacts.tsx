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
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../../app/api/agent";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface Contacts {
  id: number;
  email: string;
  subject: string;
  description: string;
  contactDate: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contacts[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lButton, setLButton] = useState(false);
  const [target, setTarget] = useState(0); // for deleting

  useEffect(() => {
    agent.Admin.listContacts()
      .then((contacts) => setContacts(contacts))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [contacts]);

  function handleDeleteProduct(id: number) {
    setLButton(true);
    setTarget(id);
    agent.Contacts.deleteContact(id)
      .catch((error) => console.log(error))
      .finally(() => {
        setLButton(false);
        setTarget(0);
      });
  }

  if (loading) return <LoadingComponent message="Loading list..." />;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.subject}
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.contactDate.split("T")[0]}</TableCell>
              <TableCell>
                <LoadingButton
                  loading={lButton && target === row.id}
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => handleDeleteProduct(row.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
