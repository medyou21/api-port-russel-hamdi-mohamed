// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Non autorisé, pas de token");
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "secret");
    req.user = decoded; // ajoute l'utilisateur décodé à la requête
    next();
  } catch (err) {
    return res.status(401).send("Token invalide");
  }
}

module.exports = verifyToken;
