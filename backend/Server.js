require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");

// Routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/catways/:catwayNumber/reservations", reservationRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Bienvenue à l'API du Port de Plaisance Russell");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
