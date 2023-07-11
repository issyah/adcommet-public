/**
 * Account settings dropdown*/
import {
  IconButton,
  Tooltip,
  Box,
  Avatar,
  Menu,
  Button,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useContextProvider } from "../context/ContextProvider";
import { handleSignOut } from "./firebase-func";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
export default function AvatarDropdown(props) {
  const { list } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { user } = useContextProvider();
  const { email } = user;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const clickSignOut = async () => {
    try {
      const result = await handleSignOut();
    } catch (error) {
      setAlert({
        show: true,
        status: "error",
        message: error?.message,
      });
      return;
    }
  };

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                bgcolor: "primary.main",
                textTransform: "uppercase",
              }}
            >
              {email ? email[0] : "A"}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        elevation={2}
        sx={{
          ".MuiPaper-root": {
            minWidth: "180px",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 6px 30px",
          },
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
      >
        <Box px={2}>
          <Typography variant="body1">{email}</Typography>
        </Box>
        <Divider sx={{my:1}}/>
        <MenuItem onClick={clickSignOut}>
          <ExitToAppIcon />
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
}
