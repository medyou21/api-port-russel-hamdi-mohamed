const router = require("express").Router();
const controller = require("../controllers/catwayController");
const auth = require("../middleware/authMiddleware");

// --- LISTE DES CATWAYS ---
router.get("/list", auth, controller.getAll);

// --- CRÉER UN CATWAY ---
router.get("/create", auth, controller.getCreatePage);
router.post("/create", auth, controller.create);

// --- ÉDITER UN CATWAY ---
router.get("/edit/:id", auth, controller.getEditPage);
router.post("/edit/:id", auth, controller.update);

// --- SUPPRIMER UN CATWAY ---
router.get("/delete/:id", auth, controller.getDeletePage);
router.post("/delete/:id", auth, controller.delete);

module.exports = router;
