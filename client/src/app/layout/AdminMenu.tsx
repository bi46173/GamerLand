import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { Link } from "react-router-dom";

export default function AdminMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
        sx={{ typography: "h6", mr: 4 }}
      >
        Admin
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem component={Link} to="/admin" onClick={handleClose}>
          Home
        </MenuItem>
        <MenuItem component={Link} to="/admin/inventory" onClick={handleClose}>
          Products
        </MenuItem>
        <MenuItem component={Link} to="/admin/contacts" onClick={handleClose}>
          Contacts
        </MenuItem>
      </Menu>
    </>
  );
}
