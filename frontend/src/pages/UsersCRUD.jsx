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
    <div>
      <Navbar />
      <main className="container">
        <h1>Gestion des utilisateurs</h1>

        <form onSubmit={submit} className="card">
          <h3>{editing ? "Modifier utilisateur" : "Créer utilisateur"}</h3>
          <input placeholder="Nom" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required />
          <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} type="email" required />
          <input placeholder="Mot de passe" value={form.password} onChange={e => setForm({...form, password: e.target.value})} type="password" />
          <button type="submit">{editing ? "Mettre à jour" : "Créer"}</button>
          {editing && <button type="button" onClick={() => setEditing(null)}>Annuler</button>}
        </form>

        <table className="table">
          <thead><tr><th>Nom</th><th>Email</th><th>Actions</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.email}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>
                  <button onClick={() => setEditing(u)}>Modifier</button>
                  <button onClick={() => handleDelete(u.email)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
