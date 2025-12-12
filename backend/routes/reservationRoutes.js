const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/reservationController");

// --- LIST ---
router.get("/list", auth, controller.getAll);

// --- CREATE ---
router.get("/create", auth, controller.createPage);
router.post("/create", auth, controller.create);

// --- EDIT ---
router.get("/edit/:id", auth, controller.editPage);
router.post("/edit/:id", auth, controller.edit);

// --- DELETE ---
router.get("/delete/:id", auth, controller.deletePage);
router.post("/delete/:id", auth, controller.delete);

module.exports = router;
