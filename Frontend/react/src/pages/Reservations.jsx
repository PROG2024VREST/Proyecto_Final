import {
  Button,
  Container,
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

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [newReservation, setNewReservation] = useState({
    room: "",
    date: "",
    time_start: "",
    time_end: "",
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/reservations/");
      setReservations(res.data);
      const roomRes = await axios.get("/api/rooms/");
      setRooms(roomRes.data);
    };
    fetchData();
  }, []);

  const handleReservation = async () => {
    try {
      await axios.post("/api/reservations/", {
        ...newReservation,
        user: user.id,
      });
      alert("Reserva creada");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/reservations/${id}/`);
      alert("Reserva cancelada");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Gestión de Reservas
      </Typography>

      {user.role !== "alumno" && (
        <div>
          <Typography variant="h6">Nueva Reserva</Typography>
          <TextField
            fullWidth
            margin="normal"
            select
            SelectProps={{ native: true }}
            label="Sala"
            onChange={(e) =>
              setNewReservation({ ...newReservation, room: e.target.value })
            }
          >
            <option value="">Seleccione</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name}
              </option>
            ))}
          </TextField>
          <TextField
            fullWidth
            margin="normal"
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setNewReservation({ ...newReservation, date: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hora de Inicio"
            type="time"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setNewReservation({
                ...newReservation,
                time_start: e.target.value,
              })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Hora de Fin"
            type="time"
            InputLabelProps={{ shrink: true }}
            onChange={(e) =>
              setNewReservation({
                ...newReservation,
                time_end: e.target.value,
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReservation}
          >
            Reservar
          </Button>
        </div>
      )}

      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Reservas Existentes
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sala</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Inicio</TableCell>
            <TableCell>Fin</TableCell>
            {user.role === "admin" && <TableCell>Acciones</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.room.name}</TableCell>
              <TableCell>{reservation.date}</TableCell>
              <TableCell>{reservation.time_start}</TableCell>
              <TableCell>{reservation.time_end}</TableCell>
              {user.role === "admin" && (
                <TableCell>
                  <Button
                    color="error"
                    onClick={() => handleDelete(reservation.id)}
                  >
                    Cancelar
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Reservations;
