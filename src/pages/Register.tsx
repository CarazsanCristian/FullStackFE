import React from "react";
import { Box } from "@mui/material";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

export const Register: React.FC = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="90vh"
  >
    <RegisterForm />
  </Box>
);
