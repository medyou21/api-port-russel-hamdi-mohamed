const Catway = require("../models/Catway");

exports.getAll = async (req, res) => {
  res.json(await Catway.find());
};

exports.getOne = async (req, res) => {
  res.json(await Catway.findOne({ catwayNumber: req.params.id }));
};

exports.create = async (req, res) => {
  const newCatway = await Catway.create(req.body);
  res.json(newCatway);
};

exports.update = async (req, res) => {
  const updated = await Catway.findOneAndUpdate(
    { catwayNumber: req.params.id },
    { catwayState: req.body.catwayState },
    { new: true }
  );
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  res.json({ message: "Catway supprimé" });
};
