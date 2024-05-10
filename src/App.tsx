import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { User } from "./pages/User";
import StorageService from "./services/storage.service";
import TopMenu from "./components/TopMenu/TopMenu";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { Logout } from "./components/Logout/Logout";
import { ShoppingList } from "./pages/ShoppingList";

function App() {
  const storedToken = StorageService.getToken();

  return (
    <div>
      <BrowserRouter>
        <TopMenu />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/user-secret" element={<User />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
