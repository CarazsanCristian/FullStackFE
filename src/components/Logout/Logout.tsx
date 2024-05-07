import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { CircularProgress } from "@mui/material";

export const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AuthService.logout().then(() => {
      navigate("/login");
    });
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress color="primary" size="lg" value={20} />
    </div>
  );
};
