const Catway = require("../models/Catway");

exports.getCatways = async (req, res) => {
  res.json(await Catway.find());
};

exports.getCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.status(404).json({ message: "Catway introuvable" });
  res.json(catway);
};

exports.createCatway = async (req, res) => {
  const exists = await Catway.findOne({ catwayNumber: req.body.catwayNumber });
  if (exists) return res.status(400).json({ message: "Numéro déjà utilisé" });

  res.json(await Catway.create(req.body));
};

exports.updateCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.status(404).json({ message: "Non trouvé" });

  // ON NE MODIFIE PAS LE NUMÉRO NI LE TYPE
  catway.catwayState = req.body.catwayState ?? catway.catwayState;

  await catway.save();
  res.json(catway);
};

exports.deleteCatway = async (req, res) => {
  await Catway.deleteOne({ catwayNumber: req.params.id });
  res.json({ message: "Catway supprimé" });
};
