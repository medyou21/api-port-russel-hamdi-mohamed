const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
};

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email déjà utilisé" });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    username,
    email,
    password: hashed
  });

  res.json(newUser);
};

exports.updateUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  user.username = username || user.username;

  if (password) user.password = await bcrypt.hash(password, 10);

  await user.save();

  res.json({ message: "Utilisateur mis à jour", user });
};

exports.deleteUser = async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

  await user.deleteOne();
  res.json({ message: "Utilisateur supprimé" });
};
