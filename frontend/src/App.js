import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import UsersCRUD from "./pages/UsersCRUD";
import CatwaysCRUD from "./pages/CatwaysCRUD";
import ReservationsCRUD from "./pages/ReservationsCRUD";
import { useAuth } from "./context/AuthContext";

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/users"
        element={
          <PrivateRoute>
            <UsersCRUD />
          </PrivateRoute>
        }
      />

      <Route
        path="/catways"
        element={
          <PrivateRoute>
            <CatwaysCRUD />
          </PrivateRoute>
        }
      />

      <Route
        path="/reservations"
        element={
          <PrivateRoute>
            <ReservationsCRUD />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
