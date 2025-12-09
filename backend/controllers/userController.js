const User = require("../models/User");

// GET /users
exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

// GET /users/:email
exports.getUserByEmail = async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select("-password");
  if (user) res.json(user);
  else res.status(404).json({ message: "Utilisateur non trouvé" });
};

// POST /users
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email, password });
  await user.save();
  res.status(201).json({ message: "Utilisateur créé avec succès" });
};

// PUT /users/:email
exports.updateUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  user.username = req.body.username || user.username;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  await user.save();
  res.json({ message: "Utilisateur mis à jour" });
};

// DELETE /users/:email
exports.deleteUser = async (req, res) => {
  const user = await User.findOneAndDelete({ email: req.params.email });
  if (user) res.json({ message: "Utilisateur supprimé" });
  else res.status(404).json({ message: "Utilisateur non trouvé" });
};
