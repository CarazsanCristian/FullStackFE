import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import StorageService from "../../services/storage.service";

export default function TopMenu() {
  const isUserLoggedIn = StorageService.getUserData();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Link to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link to="/user-secret">
            <Button color="inherit">User Secret</Button>
          </Link>
          {isUserLoggedIn ? (
            <Link to="/logout">
              <Button color="inherit">Logout</Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
