const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  // Ne pas vérifier le token pour les routes de login
  const publicPaths = ["/login", "/auth/login"];
  if (publicPaths.includes(req.path)) return next();

  if (!token) return res.redirect("/login?error=Token manquant");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.redirect("/login?error=Token invalide");
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
