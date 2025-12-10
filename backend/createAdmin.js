// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // chemin vers ton modèle User

const MONGO_URL = "mongodb+srv://Mohamed:Youssef2016@projet-api.fexuybr.mongodb.net/?appName=Projet-API";

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connecté à MongoDB");

    const hashedPassword = await bcrypt.hash("Admin123", 10);

    const adminUser = new User({
         username: "admin",   
      email: "admin@example.com",
      password: hashedPassword
      
    });

    await adminUser.save();
    console.log("Utilisateur admin créé !");
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

createAdmin();
