const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  res.json(await User.find());
};

exports.getUser = async (req, res) => {
  res.json(await User.findOne({ email: req.params.email }));
};

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ username, email, password: hashed });

  res.json(user);
};

exports.updateUser = async (req, res) => {
  const update = req.body;
  if (update.password)
    update.password = await bcrypt.hash(update.password, 10);

  const updated = await User.findOneAndUpdate(
    { email: req.params.email },
    update,
    { new: true }
  );

  res.json(updated);
};

exports.deleteUser = async (req, res) => {
  await User.findOneAndDelete({ email: req.params.email });
  res.json({ message: "Utilisateur supprimé" });
};
