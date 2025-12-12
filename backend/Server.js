/**
 * @file server.js
 * @description Point d'entrée principal de l'application Express pour la gestion des utilisateurs, catways et réservations.
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const setupSwagger = require("./swagger/swagger");

// Connexion base de données
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");
const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationsRoutes = require("./routes/reservationRoutes");

const app = express();

/**
 * ============================
 * Middleware général
 * ============================
 */
app.use(cookieParser()); // Gestion des cookies
app.use(cors()); // Autorisation des requêtes cross-origin
app.use(express.json()); // Analyse des requêtes JSON
app.use(express.urlencoded({ extended: true })); // Analyse des formulaires
app.use(express.static(path.join(__dirname, "public"))); // Fichiers statiques (CSS/JS/images)

/**
 * ============================
 * Moteur de templates EJS
 * ============================
 */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
app.use("/", viewRoutes); // Pages EJS (login, dashboard, etc.)
app.use("/auth", authRoutes); // Authentification (login)
app.use("/users", userRoutes); // Gestion des utilisateurs
app.use("/catways", catwayRoutes); // Gestion des catways
app.use("/reservations", reservationsRoutes); // Gestion des réservations

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
