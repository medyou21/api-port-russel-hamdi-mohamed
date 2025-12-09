const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getReservations, getReservationById, createReservation, updateReservation, deleteReservation } = require("../controllers/reservationController");
const router = express.Router();

router.use(protect);

router.route("/:id/reservations").get(getReservations).post(createReservation);
router.route("/:id/reservations/:idReservation").get(getReservationById).put(updateReservation).delete(deleteReservation);

module.exports = router;
