const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Page login
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  res.render("login", { error, user: null }); // user null = pas connecté
});

// POST login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/login?error=Email ou mot de passe incorrect");
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login?error=Email ou mot de passe incorrect");
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // Stockage dans un cookie sécurisé
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1h

    // Redirection vers le dashboard
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Erreur login:", err);
    res.redirect("/login?error=Erreur serveur");
  }
});

module.exports = router;
