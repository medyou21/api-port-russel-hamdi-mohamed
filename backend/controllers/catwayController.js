const Catway = require("../models/Catway");

// --- LISTE DES CATWAYS ---
exports.getAll = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("pages/catways/list", {
      catways,
      user: req.user,
      title: "Liste des Catways"
    });
  } catch (err) {
    console.error("Erreur getAll Catways:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- PAGE CRÉATION CATWAY ---
exports.getCreatePage = (req, res) => {
  res.render("pages/catways/create", {
    user: req.user,
    title: "Créer un Catway"
  });
};

// --- CRÉER UN CATWAY ---
exports.create = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    await Catway.create({ catwayNumber, catwayType, catwayState });
    res.redirect("/catways/list");
  } catch (err) {
    console.error("Erreur create Catway:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- PAGE ÉDITION CATWAY ---
exports.getEditPage = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send("Catway introuvable");

    res.render("pages/catways/edit", {
      catwayData: catway,
      user: req.user,
      title: "Éditer un Catway"
    });
  } catch (err) {
    console.error("Erreur getEditPage Catway:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- METTRE À JOUR UN CATWAY ---
exports.update = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;
    await Catway.findByIdAndUpdate(req.params.id, { catwayNumber, catwayType, catwayState });
    res.redirect("/catways/list");
  } catch (err) {
    console.error("Erreur update Catway:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- PAGE CONFIRMATION SUPPRESSION CATWAY ---
exports.getDeletePage = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send("Catway introuvable");

    res.render("pages/catways/delete", {
      catway,
      user: req.user,
      title: "Supprimer un Catway"
    });
  } catch (err) {
    console.error("Erreur getDeletePage Catway:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- SUPPRIMER UN CATWAY ---
exports.delete = async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect("/catways/list");
  } catch (err) {
    console.error("Erreur delete Catway:", err);
    res.status(500).send("Erreur serveur");
  }
};
