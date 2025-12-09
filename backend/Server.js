require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();
app.use(express.json());

// Connexion à MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/catways", reservationRoutes); // reservations sous catways

// Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue à l'API du Port de Plaisance Russell");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
