import { CssBaseline } from "@mui/material";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import ManageReservations from "./components/ManageReservations";
import NavBar from "./components/NavBar";
import Users from "./components/Users";
import ViewReservations from "./components/ViewReservations";
import { AuthProvider, useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <CssBaseline />
        <NavBar />
        <div style={{ minHeight: "calc(100vh - 64px - 64px)" }}>
          {" "}
          {/* Ajusta espacio entre el NavBar y Footer */}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/users"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage-reservations"
              element={
                <ProtectedRoute roles={["admin", "docente"]}>
                  <ManageReservations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/view-reservations"
              element={
                <ProtectedRoute roles={["admin", "docente", "alumno"]}>
                  <ViewReservations />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
