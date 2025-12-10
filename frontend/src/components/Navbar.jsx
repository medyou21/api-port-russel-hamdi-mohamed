import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/catways">Catways</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/users">Users</Link>
      </div>

      <div>
        {user && (
          <>
            <span className="nav-user">{user.username} ({user.email})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
