import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import StorageService from "../services/storage.service";

export const ProtectedRoutes: React.FC = () => {
  const navigate = useNavigate();
  const authToken = StorageService.getToken();
  const userData = StorageService.getUserData();
  const isLoggedIn = authToken && userData;
  if (!isLoggedIn) {
    navigate("/login");
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
