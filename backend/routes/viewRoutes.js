const router = require("express").Router();
const verifyToken = require("../middleware/authMiddleware");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Catway = require("../models/Catway");

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Routes d'authentification (login/logout)
 *   - name: Dashboard
 *     description: Page principale du tableau de bord
 *   - name: Users
 *     description: Gestion des utilisateurs
 *   - name: Catways
 *     description: Gestion des catways
 *   - name: Reservations
 *     description: Gestion des réservations
 */

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Affiche la page de connexion
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: error
 *         schema:
 *           type: string
 *         required: false
 *         description: Message d'erreur
 *     responses:
 *       200:
 *         description: Page login rendue avec succès
 */
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  res.render("login", { error, user: null, title: "Connexion" });
});

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Déconnecte l'utilisateur et supprime le cookie
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirection vers /login
 */
router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
});

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Affiche le tableau de bord avec les réservations
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page dashboard rendue avec succès
 */
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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Affiche la liste des utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page list users rendue avec succès
 */
router.get("/users", verifyToken, async (req, res) => {
  const users = await User.find();
  res.render("pages/users/list", {
    users,
    user: req.user,
    title: "Liste des utilisateurs"
  });
});

router.get("/users/create", verifyToken, (req, res) => {
  res.render("pages/users/create", { user: req.user, title: "Créer un utilisateur" });
});

router.get("/users/edit/:id", verifyToken, async (req, res) => {
  const userData = await User.findById(req.params.id);
  if (!userData) return res.status(404).send("Utilisateur introuvable");
  res.render("pages/users/edit", { userData, user: req.user, title: "Modifier utilisateur" });
});

/**
 * @swagger
 * /catways:
 *   get:
 *     summary: Affiche la liste des catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page list catways rendue avec succès
 */
router.get("/catways", verifyToken, async (req, res) => {
  const catways = await Catway.find();
  res.render("pages/catways/list", { catways, user: req.user, title: "Liste des Catways" });
});

router.get("/catways/create", verifyToken, (req, res) => {
  res.render("pages/catways/create", { user: req.user, title: "Créer un Catway" });
});

router.get("/catways/edit/:id", verifyToken, async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  if (!catway) return res.status(404).send("Catway introuvable");
  res.render("pages/catways/edit", { catway, user: req.user, title: "Modifier Catway" });
});

/**
 * @swagger
 * /reservations:
 *   get:
 *     summary: Affiche la liste des réservations
 *     tags: [Reservations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page list reservations rendue avec succès
 */
router.get("/reservations", verifyToken, async (req, res) => {
  const reservations = await Reservation.find();
  res.render("pages/reservations/list", { reservations, user: req.user, title: "Liste des Réservations" });
});

router.get("/reservations/create", verifyToken, (req, res) => {
  res.render("pages/reservations/create", { user: req.user, title: "Créer une Réservation" });
});

router.get("/reservations/edit/:id", verifyToken, async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) return res.status(404).send("Réservation introuvable");
  res.render("pages/reservations/edit", { reservation, user: req.user, title: "Modifier Réservation" });
});

// Default redirect
router.get("/", (req, res) => res.redirect("/login"));

module.exports = router;
