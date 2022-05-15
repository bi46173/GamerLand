import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Divider,
  ListItemSecondaryAction,
} from "@mui/material";
import { lightBlue } from "@mui/material/colors";
import React from "react";
import { format } from "date-fns";

interface Props {
  reply: string;
  replyDate: string;
}

export default function MessageRight({ reply, replyDate }: Props) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{ bgcolor: lightBlue[500], width: 60, height: 60, mr: 2 }}
            alt="You"
          >
            You
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              ></Typography>
              {` — ${reply}`}
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <Typography variant="caption" display="block" gutterBottom>
            {format(new Date(replyDate.substring(0, 19)), "dd MMMM yyyy HH:mm")}
          </Typography>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </List>
  );
}
