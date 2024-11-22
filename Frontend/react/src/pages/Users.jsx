import {
  Button,
  Container,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    role: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/", {
          headers: { Authorization: `Bearer ${user.access}` },
        });
        setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [user.access]);

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.password || !newUser.role) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    try {
      await axios.post("/api/users/", newUser, {
        headers: { Authorization: `Bearer ${user.access}` },
      });
      alert("Usuario agregado.");
      setNewUser({ username: "", password: "", role: "" });
      const updatedUsers = await axios.get("/api/users/", {
        headers: { Authorization: `Bearer ${user.access}` },
      });
      setUsers(updatedUsers.data);
    } catch (err) {
      console.error(err);
      alert("Error al agregar el usuario.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (id === user.id) {
      alert("No puedes eliminar tu propia cuenta.");
      return;
    }
    try {
      await axios.delete(`/api/users/${id}/`, {
        headers: { Authorization: `Bearer ${user.access}` },
      });
      alert("Usuario eliminado.");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error al eliminar el usuario.");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gestión de Usuarios
      </Typography>

      <Typography variant="h6">Agregar Nuevo Usuario</Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Usuario"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Contraseña"
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <Select
        fullWidth
        value={newUser.role}
        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Seleccionar Rol
        </MenuItem>
        <MenuItem value="admin">Administrador</MenuItem>
        <MenuItem value="docente">Docente</MenuItem>
        <MenuItem value="alumno">Alumno</MenuItem>
      </Select>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        style={{ marginTop: "10px" }}
      >
        Agregar Usuario
      </Button>

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Lista de Usuarios
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Rol</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.id}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                <Button
                  color="error"
                  onClick={() => handleDeleteUser(u.id)}
                  disabled={u.id === user.id} // Evita eliminar al usuario actual
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Users;
