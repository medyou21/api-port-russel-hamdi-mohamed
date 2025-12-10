import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function ReservationsCRUD() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ catwayNumber: "", clientName: "", boatName: "", startDate: "", endDate: "" });
  const [catways, setCatways] = useState([]);

  const fetch = async () => {
    try {
      const c = await api.get("/catways");
      setCatways(c.data);
      // récupérer toutes les réservations de tous les catways (simple boucle)
      let all = [];
      for (const cw of c.data) {
        const r = await api.get(`/catways/${cw.catwayNumber}/reservations`);
        all = all.concat(r.data);
      }
      setReservations(all);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    if (editing) setForm({
      catwayNumber: editing.catwayNumber,
      clientName: editing.clientName,
      boatName: editing.boatName,
      startDate: editing.startDate?.split("T")[0],
      endDate: editing.endDate?.split("T")[0]
    });
    else setForm({ catwayNumber: "", clientName: "", boatName: "", startDate: "", endDate: "" });
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/catways/${form.catwayNumber}/reservations/${editing._id}`, {
        clientName: form.clientName,
        boatName: form.boatName,
        startDate: form.startDate,
        endDate: form.endDate
      });
      setEditing(null);
    } else {
      await api.post(`/catways/${form.catwayNumber}/reservations`, {
        clientName: form.clientName,
        boatName: form.boatName,
        startDate: form.startDate,
        endDate: form.endDate
      });
    }
    setForm({ catwayNumber: "", clientName: "", boatName: "", startDate: "", endDate: "" });
    fetch();
  };

  const handleDelete = async (r) => {
    if (!window.confirm("Supprimer cette réservation ?")) return;
    await api.delete(`/catways/${r.catwayNumber}/reservations/${r._id}`);
    fetch();
  };

  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Gestion des Réservations</h1>

        <form onSubmit={submit} className="card">
          <h3>{editing ? "Modifier réservation" : "Créer réservation"}</h3>

          <select value={form.catwayNumber} onChange={e => setForm({...form, catwayNumber: e.target.value})} required>
            <option value="">Sélectionner catway</option>
            {catways.map(c => <option key={c.catwayNumber} value={c.catwayNumber}>{c.catwayNumber} - {c.catwayType}</option>)}
          </select>

          <input placeholder="Nom client" value={form.clientName} onChange={e => setForm({...form, clientName: e.target.value})} required />
          <input placeholder="Nom bateau" value={form.boatName} onChange={e => setForm({...form, boatName: e.target.value})} required />
          <label>Date début</label>
          <input type="date" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} required />
          <label>Date fin</label>
          <input type="date" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} required />

          <button type="submit">{editing ? "Mettre à jour" : "Créer"}</button>
          {editing && <button type="button" onClick={() => setEditing(null)}>Annuler</button>}
        </form>

        <table className="table">
          <thead><tr><th>Catway</th><th>Client</th><th>Bateau</th><th>Début</th><th>Fin</th><th>Actions</th></tr></thead>
          <tbody>
            {reservations.map(r => (
              <tr key={r._id}>
                <td>{r.catwayNumber}</td>
                <td>{r.clientName}</td>
                <td>{r.boatName}</td>
                <td>{new Date(r.startDate).toLocaleDateString()}</td>
                <td>{new Date(r.endDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => setEditing(r)}>Modifier</button>
                  <button onClick={() => handleDelete(r)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
