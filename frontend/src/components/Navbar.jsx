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
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm" style={{ backgroundColor: "#20c997" }}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4" to="/dashboard">
          MonApp
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link fw-semibold" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link fw-semibold" to="/catways">Catways</Link></li>
            <li className="nav-item"><Link className="nav-link fw-semibold" to="/reservations">Reservations</Link></li>
            <li className="nav-item"><Link className="nav-link fw-semibold" to="/users">Users</Link></li>
          </ul>

          {user && (
            <div className="d-flex align-items-center flex-column flex-md-row gap-2">
              <span className="text-white fw-medium">
                {user.username} <small className="text-light opacity-75">({user.email})</small>
              </span>
              <button
                className="btn btn-outline-light btn-sm rounded-pill"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
