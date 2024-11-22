import { Button, Container, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Bienvenido, {user?.username || "Usuario"}.
      </Typography>
      <Typography variant="h6">
        Rol: {user?.role === "admin" ? "Administrador" : user?.role}
      </Typography>

      {user?.role === "admin" && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/users")}
          style={{ margin: "10px" }}
        >
          Gestión de Usuarios
        </Button>
      )}

      {["admin", "docente"].includes(user?.role) && (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/reservations")}
          style={{ margin: "10px" }}
        >
          Gestión de Reservas
        </Button>
      )}
    </Container>
  );
};

export default Dashboard;
