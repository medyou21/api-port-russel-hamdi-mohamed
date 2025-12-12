require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const viewRoutes = require("./routes/viewRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cookieParser());///utilisation cookies
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // si tu veux CSS/JS/images

// Moteur de templates
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Connexion DB
connectDB();

// Routes
app.use("/", viewRoutes); // pages EJS
app.use("/auth", authRoutes); // login POST
app.use("/api/users", userRoutes);/// user

// Root
app.get("/", (req, res) => {
  res.redirect("/login");
});

// 404
app.use((req, res) => {
  res.status(404).send("Page non trouvée");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
