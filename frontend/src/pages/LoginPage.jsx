import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur de connexion");
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center vh-100" 
      style={{ background: "linear-gradient(to bottom right, #20c997, #d1e8e2)" }}
    >
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%", borderRadius: "15px", backgroundColor: "#ffffff" }}>
        <h2 className="text-center mb-4" style={{ color: "#20c997" }}>Connexion</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: "10px" }}
            />
          </div>

          <button 
            type="submit" 
            className="btn w-100" 
            style={{ backgroundColor: "#20c997", color: "#fff", borderRadius: "10px", fontWeight: "600" }}
          >
            Se connecter
          </button>
        </form>

        <p className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          © 2025 MonApp
        </p>
      </div>
    </div>
  );
}
