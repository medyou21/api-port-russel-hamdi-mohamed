const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Gestion de l'authentification des utilisateurs
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Affiche la page de connexion
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: error
 *         schema:
 *           type: string
 *         description: Message d'erreur à afficher sur la page login
 *     responses:
 *       200:
 *         description: Page de connexion affichée
 */
router.get("/login", (req, res) => {
  const error = req.query.error || null;
  res.render("login", { error, user: null }); // user null = pas connecté
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et génère un token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'adresse email de l'utilisateur
 *               password:
 *                 type: string
 *                 description: Le mot de passe de l'utilisateur
 *     responses:
 *       302:
 *         description: Redirection vers le dashboard si succès ou vers la page login avec erreur
*/
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect("/login?error=Email");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect("/login?error=mot de passe incorrect");
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
