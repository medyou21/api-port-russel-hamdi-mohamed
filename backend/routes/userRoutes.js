const router = require("express").Router();
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gestion des utilisateurs
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste des utilisateurs
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des utilisateurs récupérée avec succès
 */
router.get("/", verifyToken, userController.getAllUsers);

/**
 * @swagger
 * /users/create:
 *   get:
 *     summary: Affiche le formulaire de création d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Formulaire affiché
 */
router.get("/create", verifyToken, userController.showCreateForm);

/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection après création réussie
 */
router.post("/create", verifyToken, userController.createUser);

/**
 * @swagger
 * /users/edit/{id}:
 *   get:
 *     summary: Affiche le formulaire d'édition d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Formulaire affiché
 */
router.get("/edit/:id", verifyToken, userController.showEditForm);

/**
 * @swagger
 * /users/edit/{id}:
 *   post:
 *     summary: Met à jour un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection après mise à jour
 */
router.post("/edit/:id", verifyToken, userController.updateUser);

/**
 * @swagger
 * /users/delete/{id}:
 *   get:
 *     summary: Affiche le formulaire de suppression d'un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Formulaire affiché
 */
router.get("/delete/:id", verifyToken, userController.showDeleteForm);

/**
 * @swagger
 * /users/delete/{id}:
 *   post:
 *     summary: Supprime un utilisateur
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       302:
 *         description: Redirection après suppression
 */
router.post("/delete/:id", verifyToken, userController.deleteUser);

module.exports = router;
