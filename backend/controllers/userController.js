const User = require("../models/User");

// --- GET --- Liste utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("pages/users/list", { 
      users, 
      user: req.user, 
      title: "Liste des utilisateurs" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

// --- CREATE ---
exports.showCreateForm = (req, res) => {
  res.render("pages/users/create", { 
    user: req.user, 
    title: "Créer un utilisateur" 
  });
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.redirect("/users/create?error=Champs manquants");
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.redirect("/users/create?error=Email déjà utilisé");
    }

    // Le modèle hash le mot de passe automatiquement
    await User.create({ username, email, password });

    res.redirect("/users");
  } catch (err) {
    console.error("Erreur création utilisateur :", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- EDIT ---
exports.showEditForm = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) return res.status(404).send("Utilisateur introuvable");

    res.render("pages/users/edit", { 
      userData, 
      user: req.user, 
      title: "Éditer utilisateur" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const userData = await User.findById(req.params.id);
    if (!userData) return res.status(404).send("Utilisateur introuvable");

    userData.username = username;
    userData.email = email;

    // Si le mot de passe est renseigné → Mongoose va le re-hasher
    if (password && password.trim() !== "") {
      userData.password = password;
    }

    await userData.save(); // déclenche le pre("save")
    res.redirect("/users");
  } catch (err) {
    console.error("Erreur update user :", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- DELETE ---
exports.showDeleteForm = async (req, res) => {
  try {
    const userData = await User.findById(req.params.id);
    if (!userData) return res.status(404).send("Utilisateur introuvable");

    res.render("pages/users/delete", { 
      userData, 
      user: req.user, 
      title: "Supprimer utilisateur" 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/users");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erreur serveur");
  }
};
