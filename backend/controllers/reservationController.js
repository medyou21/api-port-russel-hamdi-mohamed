const Reservation = require("../models/Reservation");

// --- LIST ---
exports.getAll = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("pages/reservations/list", { reservations, user: req.user, title: "Liste des Réservations" });
  } catch (err) {
    console.error("Erreur getAll reservations:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- CREATE ---
exports.createPage = (req, res) => {
  res.render("pages/reservations/create", { user: req.user, title: "Créer une Réservation" });
};

exports.create = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    await Reservation.create({ catwayNumber, clientName, boatName, startDate, endDate });
    res.redirect("/reservations/list");
  } catch (err) {
    console.error("Erreur création réservation:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- EDIT ---
exports.editPage = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send("Réservation introuvable");

    res.render("pages/reservations/edit", { reservation, user: req.user, title: "Modifier Réservation" });
  } catch (err) {
    console.error("Erreur editPage:", err);
    res.status(500).send("Erreur serveur");
  }
};

exports.edit = async (req, res) => {
  try {
    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;
    await Reservation.findByIdAndUpdate(req.params.id, { catwayNumber, clientName, boatName, startDate, endDate });
    res.redirect("/reservations/list");
  } catch (err) {
    console.error("Erreur edit reservation:", err);
    res.status(500).send("Erreur serveur");
  }
};

// --- DELETE ---
exports.deletePage = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send("Réservation introuvable");

    res.render("pages/reservations/delete", { reservation, user: req.user, title: "Supprimer Réservation" });
  } catch (err) {
    console.error("Erreur deletePage:", err);
    res.status(500).send("Erreur serveur");
  }
};

exports.delete = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.redirect("/reservations/list");
  } catch (err) {
    console.error("Erreur delete reservation:", err);
    res.status(500).send("Erreur serveur");
  }
};
