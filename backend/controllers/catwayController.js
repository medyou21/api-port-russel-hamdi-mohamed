const Catway = require("../models/Catway");

// GET /catways
exports.getCatways = async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
};

// GET /catways/:id
exports.getCatwayById = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (catway) res.json(catway);
  else res.status(404).json({ message: "Catway non trouvé" });
};

// POST /catways
exports.createCatway = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;
  const catway = new Catway({ catwayNumber, catwayType, catwayState });
  await catway.save();
  res.status(201).json({ message: "Catway créé" });
};

// PUT /catways/:id
exports.updateCatway = async (req, res) => {
  const catway = await Catway.findOne({ catwayNumber: req.params.id });
  if (!catway) return res.status(404).json({ message: "Catway non trouvé" });

  catway.catwayState = req.body.catwayState || catway.catwayState;
  await catway.save();
  res.json({ message: "Catway mis à jour" });
};

// DELETE /catways/:id
exports.deleteCatway = async (req, res) => {
  const catway = await Catway.findOneAndDelete({ catwayNumber: req.params.id });
  if (catway) res.json({ message: "Catway supprimé" });
  else res.status(404).json({ message: "Catway non trouvé" });
};
