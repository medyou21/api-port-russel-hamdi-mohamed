const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const controller = require("../controllers/reservationController");

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /reservations/list:
 *   get:
 *     summary: Récupère la liste de toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée avec succès
 *       401:
 *         description: Non autorisé (token manquant ou invalide)
 */
router.get("/list", auth, controller.getAll);

/**
 * @swagger
 * /reservations/create:
 *   get:
 *     summary: Page pour créer une réservation
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Page création affichée
 *       401:
 *         description: Non autorisé
 *   post:
 *     summary: Crée une nouvelle réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       302:
 *         description: Redirection après création réussie
 *       401:
 *         description: Non autorisé
 */
router.get("/create", auth, controller.createPage);
router.post("/create", auth, controller.create);

/**
 * @swagger
 * /reservations/edit/{id}:
 *   get:
 *     summary: Page pour éditer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page édition affichée
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 *   post:
 *     summary: Modifie une réservation existante
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: integer
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       302:
 *         description: Redirection après modification réussie
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 */
router.get("/edit/:id", auth, controller.editPage);
router.post("/edit/:id", auth, controller.edit);

/**
 * @swagger
 * /reservations/delete/{id}:
 *   get:
 *     summary: Page de confirmation pour supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Page de confirmation affichée
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 *   post:
 *     summary: Supprime une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la réservation
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Redirection après suppression réussie
 *       404:
 *         description: Réservation non trouvée
 *       401:
 *         description: Non autorisé
 */
router.get("/delete/:id", auth, controller.deletePage);
router.post("/delete/:id", auth, controller.delete);

module.exports = router;
