import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        // On récupère toutes les réservations de tous les catways (backend propose endpoint par catway;
        // ici on suppose qu'il y a une route /catways pour obtenir la liste, puis on récupère les réservations du premier catway pour exemple)
        const catways = await api.get("/catways");
        if (catways.data.length === 0) {
          setReservations([]);
          return;
        }
        // exemple : récupérer reservations du premier catway
        const first = catways.data[0];
        const res = await api.get(`/catways/${first.catwayNumber}/reservations`);
        setReservations(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Tableau de bord</h1>
        <p>Utilisateur connecté : {user?.username} — {user?.email}</p>
        <p>Date : {new Date().toLocaleDateString()}</p>

        <h2>Réservations (exemple)</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Catway</th><th>Client</th><th>Bateau</th><th>Début</th><th>Fin</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r._id}>
                <td>{r.catwayNumber}</td>
                <td>{r.clientName}</td>
                <td>{r.boatName}</td>
                <td>{new Date(r.startDate).toLocaleDateString()}</td>
                <td>{new Date(r.endDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
