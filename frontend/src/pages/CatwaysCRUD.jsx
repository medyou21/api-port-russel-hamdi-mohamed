import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function CatwaysCRUD() {
  const [catways, setCatways] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ catwayNumber: "", catwayType: "short", catwayState: "" });

  const fetch = async () => {
    const res = await api.get("/catways");
    setCatways(res.data);
  };

  useEffect(() => { fetch(); }, []);

  useEffect(() => {
    if (editing) setForm({
      catwayNumber: editing.catwayNumber,
      catwayType: editing.catwayType,
      catwayState: editing.catwayState
    });
    else setForm({ catwayNumber: "", catwayType: "short", catwayState: "" });
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/catways/${editing.catwayNumber}`, { catwayState: form.catwayState });
      setEditing(null);
    } else {
      await api.post("/catways", {
        catwayNumber: Number(form.catwayNumber),
        catwayType: form.catwayType,
        catwayState: form.catwayState
      });
    }
    setForm({ catwayNumber: "", catwayType: "short", catwayState: "" });
    fetch();
  };

  const handleDelete = async (num) => {
    if (!window.confirm("Supprimer ce catway ?")) return;
    await api.delete(`/catways/${num}`);
    fetch();
  };

  return (
    <div style={{ backgroundColor: "#f0f4f5", minHeight: "100vh" }}>
      <Navbar />
      <main className="container my-4">
        <h1 className="text-center mb-4" style={{ color: "#20c997" }}>Gestion des Catways</h1>

        {/* Stats card */}
        <div className="row mb-4">
          <div className="col-12 col-md-4">
            <div className="card text-center shadow-sm p-4" style={{ borderRadius: "15px", backgroundColor: "#e0f7f4" }}>
              <h4 style={{ color: "#20c997" }}>Total Catways</h4>
              <p className="display-6">{catways.length}</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-3 mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <h3 className="mb-3" style={{ color: "#20c997" }}>{editing ? "Modifier état" : "Créer Catway"}</h3>
          <form onSubmit={submit} className="row g-3">
            {!editing && (
              <div className="col-12 col-md-4">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Numéro"
                  value={form.catwayNumber}
                  onChange={e => setForm({ ...form, catwayNumber: e.target.value })}
                  required
                />
              </div>
            )}
            <div className="col-12 col-md-4">
              <select
                className="form-select"
                value={form.catwayType}
                onChange={e => setForm({ ...form, catwayType: e.target.value })}
                disabled={editing}
              >
                <option value="short">short</option>
                <option value="long">long</option>
              </select>
            </div>
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Etat"
                value={form.catwayState}
                onChange={e => setForm({ ...form, catwayState: e.target.value })}
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

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Numéro</th>
                <th>Type</th>
                <th>Etat</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {catways.length > 0 ? (
                catways.map(c => (
                  <tr key={c.catwayNumber}>
                    <td>{c.catwayNumber}</td>
                    <td>{c.catwayType}</td>
                    <td>{c.catwayState}</td>
                    <td className="d-flex flex-wrap gap-1">
                      <button className="btn btn-info btn-sm rounded-pill" onClick={() => setEditing(c)}>Modifier</button>
                      <button className="btn btn-danger btn-sm rounded-pill" onClick={() => handleDelete(c.catwayNumber)}>Supprimer</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">Aucun catway</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
