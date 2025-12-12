const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Catway = require("../models/Catway"); // modèle Catway

// --- PAGE DE CONNEXION ---
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  res.render("login", { error, user: null, title: "Connexion" });
});

// --- DÉCONNEXION ---
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// --- DASHBOARD ---
router.get("/dashboard", verifyToken, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("dashboard", {
      user: req.user,
      date: new Date().toLocaleDateString(),
      reservations,
      title: "Dashboard"
    });
  } catch (err) {
    console.error("Erreur dashboard:", err);
    res.status(500).send("Erreur serveur");
  }
});

// === USERS PAGES ===

///////////users list
router.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    res.render("pages/users/list", {
      users,            // les données à afficher
      user: req.user,   // pour la navbar
      title: "Liste des utilisateurs" // pour le header
    });
  } catch (err) {
    console.error("Erreur list users:", err);
    res.status(500).send("Erreur serveur");
  }
});
///////users create
router.get("/users/create", verifyToken, (req, res) => {
  res.render("pages/users/create", { user: req.user, title: "Créer un utilisateur" });
});
//////users edit
router.get("/users/edit/:id", verifyToken, async (req, res) => {
  try {
    const userData = await User.findById( req.params.id );
    if (!userData) return res.status(404).send("Utilisateur introuvable");

    res.render("pages/users/edit", { userData, user: req.user, title: "Modifier utilisateur" });
  } catch (err) {
    console.error("Erreur edit user:", err);
    res.status(500).send("Erreur serveur");
  }
});

// === CATWAYS PAGES ===
///////////CATWAYS list
router.get("/catways", verifyToken, async (req, res) => {
  try {
    const catways = await Catway.find();
    res.render("pages/catways/list", { catways, user: req.user, title: "Liste des Catways" });
  } catch (err) {
    console.error("Erreur list catways:", err);
    res.status(500).send("Erreur serveur");
  }
});
////////::CATWAYS create
router.get("/catways/create", verifyToken, (req, res) => {
  res.render("pages/catways/create", { user: req.user, title: "Créer un Catway" });
});

//////:CATWAYS edit
router.get("/catways/edit/:id", verifyToken, async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).send("Catway introuvable");

    res.render("pages/catways/edit", { catway, user: req.user, title: "Modifier Catway" });
  } catch (err) {
    console.error("Erreur edit catway:", err);
    res.status(500).send("Erreur serveur");
  }
});

// === RESERVATIONS PAGES ===
////////::RESERVATIONS list
router.get("/reservations", verifyToken, async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.render("pages/reservations/list", { reservations, user: req.user, title: "Liste des Réservations" });
  } catch (err) {
    console.error("Erreur list reservations:", err);
    res.status(500).send("Erreur serveur");
  }
});

////////::RESERVATIONS create
router.get("/reservations/create", verifyToken, (req, res) => {
  res.render("pages/reservations/create", { user: req.user, title: "Créer une Réservation" });
});


////////::RESERVATIONS edit
router.get("/reservations/edit/:id", verifyToken, async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) return res.status(404).send("Réservation introuvable");

    res.render("pages/reservations/edit", { reservation, user: req.user, title: "Modifier Réservation" });
  } catch (err) {
    console.error("Erreur edit reservation:", err);
    res.status(500).send("Erreur serveur");
  }
});

// --- PAGE PAR DÉFAUT ---
router.get("/", (req, res) => res.redirect("/login"));

module.exports = router;
