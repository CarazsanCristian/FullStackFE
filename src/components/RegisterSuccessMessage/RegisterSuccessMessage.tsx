import React from "react";
import { Button } from "@mui/material";
import "./RegisterSuccessMessage.css";

export const RegisterSuccessMessage: React.FC = () => (
  <section className="register-success">
    <h1>Registration successful!</h1>
    <p>You may go ahead and login now.</p>
    <Button variant="contained" color="success" href="/login" disableElevation>
      Log in
    </Button>
  </section>
);
