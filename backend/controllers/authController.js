const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.render("login", { error: "Utilisateur non trouvé", user: null });

    // Vérification simple mot de passe (remplacer par bcrypt en prod)
    if (user.password !== password) return res.render("login", { error: "Mot de passe incorrect", user: null });

    // Générer token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Stocker token dans un cookie sécurisé
    res.cookie("token", token, {
      httpOnly: true,       // Empêche JS côté client de lire le cookie
      sameSite: "Lax",      // Pour que le cookie fonctionne en localhost
      secure: false,        // true si HTTPS (localhost = false)
      maxAge: 3600000       // 1h
    });

    res.redirect("/dashboard");
  } catch (err) {
    console.error("Erreur login:", err);
    res.render("login", { error: "Erreur serveur", user: null });
  }
};
