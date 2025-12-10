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
    if (editing) setForm({ catwayNumber: editing.catwayNumber, catwayType: editing.catwayType, catwayState: editing.catwayState });
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
    <div>
      <Navbar />
      <main className="container">
        <h1>Gestion des Catways</h1>

        <form onSubmit={submit} className="card">
          <h3>{editing ? "Modifier état" : "Créer Catway"}</h3>
          {!editing && <input placeholder="Numéro" value={form.catwayNumber} onChange={e => setForm({...form, catwayNumber: e.target.value})} type="number" required />}
          <select value={form.catwayType} onChange={e => setForm({...form, catwayType: e.target.value})} disabled={editing}>
            <option value="short">short</option>
            <option value="long">long</option>
          </select>
          <input placeholder="Etat" value={form.catwayState} onChange={e => setForm({...form, catwayState: e.target.value})} required />
          <button type="submit">{editing ? "Mettre à jour" : "Créer"}</button>
          {editing && <button type="button" onClick={() => setEditing(null)}>Annuler</button>}
        </form>

        <table className="table">
          <thead><tr><th>Numéro</th><th>Type</th><th>Etat</th><th>Actions</th></tr></thead>
          <tbody>
            {catways.map(c => (
              <tr key={c.catwayNumber}>
                <td>{c.catwayNumber}</td>
                <td>{c.catwayType}</td>
                <td>{c.catwayState}</td>
                <td>
                  <button onClick={() => setEditing(c)}>Modifier</button>
                  <button onClick={() => handleDelete(c.catwayNumber)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
