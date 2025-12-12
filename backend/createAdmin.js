const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // chemin correct

const MONGO_URL = "mongodb+srv://Mohamed:Youssef2016@projet-api.fexuybr.mongodb.net/?appName=Projet-API";

const createAdmin = async () => {
  try {
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

    await adminUser.save();
    console.log("✅ Utilisateur admin créé !");
  } catch (err) {
    console.error("❌ Erreur :", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Connexion MongoDB fermée");
  }
};

createAdmin();
