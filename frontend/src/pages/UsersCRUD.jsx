import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../services/api";

export default function UsersCRUD() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    if (editing) setForm({ username: editing.username, email: editing.email, password: "" });
    else setForm({ username: "", email: "", password: "" });
  }, [editing]);

  const submit = async (e) => {
    e.preventDefault();
    if (editing) {
      await api.put(`/users/${editing.email}`, { username: form.username, password: form.password || undefined });
      setEditing(null);
    } else {
      await api.post("/users", form);
    }
    setForm({ username: "", email: "", password: "" });
    fetchUsers();
  };

  const handleDelete = async (email) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    await api.delete(`/users/${email}`);
    fetchUsers();
  };

  return (
    <div style={{ backgroundColor: "#f0f4f5", minHeight: "100vh" }}>
      <Navbar />
      <main className="container my-4">

        <h1 className="mb-4 text-center" style={{ color: "#20c997" }}>Gestion des utilisateurs</h1>

        <div className="card p-4 mb-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
          <h3 className="mb-3" style={{ color: "#20c997" }}>
            {editing ? "Modifier utilisateur" : "Créer utilisateur"}
          </h3>
          <form onSubmit={submit} className="row g-3">
            <div className="col-12 col-md-4">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="Nom"
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="email"
                className="form-control rounded-pill"
                placeholder="Email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
                disabled={editing}
              />
            </div>
            <div className="col-12 col-md-4">
              <input
                type="password"
                className="form-control rounded-pill"
                placeholder="Mot de passe"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
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
              {editing && 
                <button 
                  type="button" 
                  className="btn btn-secondary rounded-pill" 
                  onClick={() => setEditing(null)}
                >
                  Annuler
                </button>
              }
            </div>
          </form>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover shadow-sm" style={{ borderRadius: "10px", overflow: "hidden" }}>
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(u => (
                  <tr key={u.email}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="d-flex flex-wrap gap-2">
                      <button 
                        className="btn btn-info btn-sm" 
                        style={{ borderRadius: "50px" }} 
                        onClick={() => setEditing(u)}
                      >
                        Modifier
                      </button>
                      <button 
                        className="btn btn-danger btn-sm" 
                        style={{ borderRadius: "50px" }} 
                        onClick={() => handleDelete(u.email)}
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted">Aucun utilisateur</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
