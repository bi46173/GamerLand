import {
  Card,
  Grid,
  Avatar,
  Rating,
  IconButton,
  Popover,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";

export default function ProductRatings({ ...props }: any) {
  const { rating } = props;

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Card sx={{ p: 1, mb: 1 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs={2}>
          <Avatar>{rating.user[0]}</Avatar>
        </Grid>
        <Grid item xs={7}>
          {rating.comment.substring(0, 25)}
        </Grid>
        <Grid item xs={3}>
          <Rating
            name="rating"
            value={rating.rating}
            defaultValue={0.0}
            precision={0.25}
            size="small"
            readOnly
            sx={{ pr: 1 }}
          />
          {rating.comment.length > 25 && (
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
          )}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>{rating.comment}</Typography>
          </Popover>
        </Grid>
      </Grid>
    </Card>
  );
}
