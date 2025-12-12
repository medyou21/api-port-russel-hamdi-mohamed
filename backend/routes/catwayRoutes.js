const router = require("express").Router();
const controller = require("../controllers/catwayController");
const auth = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Catways
 *   description: Gestion des catways
 */

/**
 * @swagger
 * /catways/list:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page affichant tous les catways
 */
router.get("/list", auth, controller.getAll);

/**
 * @swagger
 * /catways/create:
 *   get:
 *     summary: Affiche le formulaire pour créer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Page de création d'un catway
 */
router.get("/create", auth, controller.getCreatePage);

/**
 * @swagger
 * /catways/create:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               catwayType:
 *                 type: string
 *               catwayState:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection vers la liste des catways après création
 */
router.post("/create", auth, controller.create);

/**
 * @swagger
 * /catways/edit/{id}:
 *   get:
 *     summary: Affiche le formulaire pour éditer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à éditer
 *     responses:
 *       200:
 *         description: Page d'édition du catway
 */
router.get("/edit/:id", auth, controller.getEditPage);

/**
 * @swagger
 * /catways/edit/{id}:
 *   post:
 *     summary: Met à jour un catway existant
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               catwayType:
 *                 type: string
 *               catwayState:
 *                 type: string
 *     responses:
 *       302:
 *         description: Redirection vers la liste des catways après mise à jour
 */
router.post("/edit/:id", auth, controller.update);

/**
 * @swagger
 * /catways/delete/{id}:
 *   get:
 *     summary: Affiche la page de confirmation pour supprimer un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à supprimer
 *     responses:
 *       200:
 *         description: Page de confirmation pour supprimer un catway
 */
router.get("/delete/:id", auth, controller.getDeletePage);

/**
 * @swagger
 * /catways/delete/{id}:
 *   post:
 *     summary: Supprime un catway
 *     tags: [Catways]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du catway à supprimer
 *     responses:
 *       302:
 *         description: Redirection vers la liste des catways après suppression
 */
router.post("/delete/:id", auth, controller.delete);

module.exports = router;
