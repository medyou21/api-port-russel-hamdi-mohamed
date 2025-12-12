const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

// Liste des utilisateurs
router.get("/", verifyToken, userController.getAllUsers);

// Page création utilisateur
router.get("/create", verifyToken, userController.showCreateForm);
router.post("/create", verifyToken, userController.createUser);

// Page édition utilisateur
router.get("/edit/:id", verifyToken, userController.showEditForm);
router.post("/edit/:id", verifyToken, userController.updateUser);

// Page suppression utilisateur
router.get("/delete/:id", verifyToken, userController.showDeleteForm);
router.post("/delete/:id", verifyToken, userController.deleteUser);

module.exports = router;
