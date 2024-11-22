import { AppBar, Button, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" href="/">
          Inicio
        </Button>
        {user && user.role === "admin" && (
          <Button color="inherit" href="/users">
            Gestión de Usuarios
          </Button>
        )}
        <Button color="inherit" href="/reservations">
          Reservas
        </Button>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Cerrar Sesión
          </Button>
        ) : (
          <Button color="inherit" href="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
