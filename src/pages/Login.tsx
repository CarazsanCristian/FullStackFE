import React from "react";
import { Box } from "@mui/material";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const Login: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="90vh"
  >
    <LoginForm />
  </Box>
);
