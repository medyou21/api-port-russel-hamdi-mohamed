const router = require("express").Router();
const controller = require("../controllers/reservationController");
const auth = require("../middleware/auth");

router.get("/:id/reservations", auth, controller.getAll);
router.get("/:id/reservations/:idReservation", auth, controller.getOne);
router.post("/:id/reservations", auth, controller.create);
router.put("/:id/reservations/:idReservation", auth, controller.update);
router.delete("/:id/reservations/:idReservation", auth, controller.delete);

module.exports = router;
