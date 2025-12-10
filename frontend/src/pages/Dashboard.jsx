import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [catwaysCount, setCatwaysCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catwaysRes = await api.get("/catways");
        setCatwaysCount(catwaysRes.data.length);

        const usersRes = await api.get("/users");
        setUsersCount(usersRes.data.length);

        // récupérer toutes les réservations
        let allReservations = [];
        for (const cw of catwaysRes.data) {
          const r = await api.get(`/catways/${cw.catwayNumber}/reservations`);
          allReservations = allReservations.concat(r.data);
        }
        setReservations(allReservations);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{ backgroundColor: "#f0f4f5", minHeight: "100vh" }}>
      <Navbar />

      <main className="container my-4">
        <h1 className="text-center mb-4" style={{ color: "#20c997" }}>Tableau de bord</h1>
        <p className="text-center mb-5">Bienvenue {user?.username} ({user?.email}) — {new Date().toLocaleDateString()}</p>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card shadow-sm p-4 text-center" style={{ borderRadius: "15px", backgroundColor: "#e0f7f4" }}>
              <h4 style={{ color: "#20c997" }}>Catways</h4>
              <p className="display-6">{catwaysCount}</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm p-4 text-center" style={{ borderRadius: "15px", backgroundColor: "#e0f7f4" }}>
              <h4 style={{ color: "#20c997" }}>Utilisateurs</h4>
              <p className="display-6">{usersCount}</p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card shadow-sm p-4 text-center" style={{ borderRadius: "15px", backgroundColor: "#e0f7f4" }}>
              <h4 style={{ color: "#20c997" }}>Réservations</h4>
              <p className="display-6">{reservations.length}</p>
            </div>
          </div>
        </div>

        {/* Recent Reservations Table */}
        <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <h3 className="mb-3" style={{ color: "#20c997" }}>Réservations récentes</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Catway</th>
                  <th>Client</th>
                  <th>Bateau</th>
                  <th>Début</th>
                  <th>Fin</th>
                </tr>
              </thead>
              <tbody>
                {reservations.slice(-10).reverse().map(r => (
                  <tr key={r._id}>
                    <td>{r.catwayNumber}</td>
                    <td>{r.clientName}</td>
                    <td>{r.boatName}</td>
                    <td>{new Date(r.startDate).toLocaleDateString()}</td>
                    <td>{new Date(r.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
                {reservations.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">Aucune réservation</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
