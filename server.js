/**
 * @file server.js
 * @description Point d'entrée principal de l'application Express pour la gestion des utilisateurs, catways et réservations.
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ⚠️ Chemin mis à jour vers swagger
const setupSwagger = require("./backend/swagger/swagger");

// ⚠️ Chemins mis à jour pour config et routes
const connectDB = require("./backend/config/db");
const authRoutes = require("./backend/routes/authRoutes");
const viewRoutes = require("./backend/routes/viewRoutes");
const userRoutes = require("./backend/routes/userRoutes");
const catwayRoutes = require("./backend/routes/catwayRoutes");
const reservationsRoutes = require("./backend/routes/reservationRoutes");

const app = express();

/**
 * ============================
 * Middleware général
 * ============================
 */
app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ⚠️ Chemin mis à jour pour public
app.use(express.static(path.join(__dirname, "backend/public")));

/**
 * ============================
 * Moteur de templates EJS
 * ============================
 */
// ⚠️ Chemin mis à jour pour views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "backend/views"));

/**
 * ============================
 * Connexion MongoDB
 * ============================
 */
connectDB();

/**
 * ============================
 * Déclaration des routes
 * ============================
 */
app.use("/", viewRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/reservations", reservationsRoutes);

/**
 * ============================
 * Swagger (API documentation)
 * ============================
 */
setupSwagger(app);

/**
 * ============================
 * Middleware pour les routes non trouvées (404)
 * ============================
 */
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

/**
 * ============================
 * Démarrage du serveur
 * ============================
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
