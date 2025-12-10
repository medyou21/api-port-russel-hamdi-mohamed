import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function ReservationsCRUD() {
  const [reservations, setReservations] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    catwayNumber: "",
    clientName: "",
    boatName: "",
    startDate: "",
    endDate: ""
  });
  const [catways, setCatways] = useState([]);

  const fetchData = async () => {
    try {
      const c = await api.get("/catways");
      setCatways(c.data || []);

      let allReservations = [];
      for (const cw of c.data || []) {
        const r = await api.get(`/catways/${cw.catwayNumber}/reservations`);
        allReservations = allReservations.concat(r.data || []);
      }
      setReservations(allReservations);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (editing) {
      setForm({
        catwayNumber: editing.catwayNumber,
        clientName: editing.clientName,
        boatName: editing.boatName,
        startDate: editing.startDate ? editing.startDate.split("T")[0] : "",
        endDate: editing.endDate ? editing.endDate.split("T")[0] : ""
      });
    } else {
      setForm({ catwayNumber: "", clientName: "", boatName: "", startDate: "", endDate: "" });
    }
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (r) => {
    if (!window.confirm("Supprimer cette réservation ?")) return;
    try {
      await api.delete(`/catways/${r.catwayNumber}/reservations/${r._id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#f0f4f5", minHeight: "100vh" }}>
      <Navbar />
      <main className="container my-4">
        <h1 className="mb-4 text-center" style={{ color: "#20c997" }}>Gestion des Réservations</h1>

        <div className="card p-4 mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <h3 className="mb-3" style={{ color: "#20c997" }}>
            {editing ? "Modifier réservation" : "Créer réservation"}
          </h3>
          <form onSubmit={handleSubmit} className="row g-3">

            {/* Ligne 1 : Catway, Client, Bateau */}
            <div className="col-12 col-md-4">
              <select
                className="form-select rounded-pill"
                value={form.catwayNumber}
                onChange={e => setForm({ ...form, catwayNumber: e.target.value })}
                required
              >
                <option value="">Sélectionner catway</option>
                {catways.map(c => (
                  <option key={c.catwayNumber} value={c.catwayNumber}>
                    {c.catwayNumber} - {c.catwayType}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Nom client"
                value={form.clientName}
                onChange={e => setForm({ ...form, clientName: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Nom bateau"
                value={form.boatName}
                onChange={e => setForm({ ...form, boatName: e.target.value })}
                required
              />
            </div>

            {/* Ligne 2 : Début et Fin */}
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control rounded-pill"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="date"
                className="form-control rounded-pill"
                value={form.endDate}
                onChange={e => setForm({ ...form, endDate: e.target.value })}
                required
              />
            </div>

            <div className="col-12 d-flex gap-2 flex-wrap">
              <button
                type="submit"
                className="btn"
                style={{ backgroundColor: "#20c997", color: "#fff", borderRadius: "50px" }}
              >
                {editing ? "Mettre à jour" : "Créer"}
              </button>
              {editing && (
                <button type="button" className="btn btn-secondary rounded-pill" onClick={() => setEditing(null)}>
                  Annuler
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Table des réservations */}
        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
            <thead className="table-dark">
              <tr>
                <th>Catway</th>
                <th>Client</th>
                <th>Bateau</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.length > 0 ? (
                reservations.map(r => (
                  <tr key={r._id}>
                    <td>{r.catwayNumber}</td>
                    <td>{r.clientName}</td>
                    <td>{r.boatName}</td>
                    <td>{r.startDate ? new Date(r.startDate).toLocaleDateString() : ""}</td>
                    <td>{r.endDate ? new Date(r.endDate).toLocaleDateString() : ""}</td>
                    <td className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-info btn-sm"
                        style={{ borderRadius: "50px" }}
                        onClick={() => setEditing(r)}
                      >
                        Modifier
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        style={{ borderRadius: "50px" }}
                        onClick={() => handleDelete(r)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-muted">Aucune réservation</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
