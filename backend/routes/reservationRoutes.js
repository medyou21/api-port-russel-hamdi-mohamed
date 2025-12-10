const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation
} = require("../controllers/reservationController");

router.get("/", getReservations);
router.get("/:idReservation", getReservation);
router.post("/", createReservation);
router.put("/:idReservation", updateReservation);
router.delete("/:idReservation", deleteReservation);

module.exports = router;
