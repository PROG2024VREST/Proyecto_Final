import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/token/", credentials);
      const { access, refresh } = response.data;
      const userResponse = await axios.get("/api/users/me/", {
        headers: { Authorization: `Bearer ${access}` },
      });
      login({ ...userResponse.data, access, refresh });
      navigate("/dashboard");
    } catch (err) {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Usuario"
          name="username"
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Contraseña"
          name="password"
          type="password"
          onChange={handleChange}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button fullWidth variant="contained" type="submit">
          Ingresar
        </Button>
      </form>
    </Container>
  );
};

export default Login;
