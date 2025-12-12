/**
 * @file createAdmin.js
 * @description Script pour créer un utilisateur administrateur dans la base MongoDB.
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Chemin vers le modèle User

/**
 * @constant {string} MONGO_URL
 * @description URL de connexion à MongoDB
 */
const MONGO_URL = "mongodb+srv://Mohamed:Youssef2016@projet-api.fexuybr.mongodb.net/?appName=Projet-API";

/**
 * @async
 * @function createAdmin
 * @description Crée un utilisateur admin si il n'existe pas déjà.
 * - Connecte à MongoDB
 * - Vérifie l'existence de l'admin
 * - Hash le mot de passe
 * - Crée et sauvegarde l'utilisateur admin
 * - Ferme la connexion MongoDB
 */
const createAdmin = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(MONGO_URL);
    console.log("✅ Connecté à MongoDB");

    // Vérifie si l’admin existe déjà
    const existing = await User.findOne({ email: "admin@example.com" });
    if (existing) {
      console.log("⚠️ L’utilisateur admin existe déjà !");
      return;
    }

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash("Admin123", 10);

    // Création de l’admin
    const adminUser = new User({
      username: "admin",
      email: "admin@example.com",
      password: hashedPassword
    });

    // Sauvegarde dans la base
    await adminUser.save();
    console.log("✅ Utilisateur admin créé !");
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    // Fermeture de la connexion MongoDB
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

// Exécution de la fonction
createAdmin();
