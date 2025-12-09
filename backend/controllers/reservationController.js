const Reservation = require("../models/Reservation");

// GET /catways/:id/reservations
exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.id });
  res.json(reservations);
};

// GET /catways/:id/reservations/:idReservation
exports.getReservationById = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  if (reservation) res.json(reservation);
  else res.status(404).json({ message: "Réservation non trouvée" });
};

// POST /catways/:id/reservations
exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    catwayNumber: req.params.id,
    ...req.body
  });
  await reservation.save();
  res.status(201).json({ message: "Réservation créée" });
};

// PUT /catways/:id/reservations/:idReservation
exports.updateReservation = async (req, res) => {
  const reservation = await Reservation.findById(req.params.idReservation);
  if (!reservation) return res.status(404).json({ message: "Réservation non trouvée" });

  Object.assign(reservation, req.body);
  await reservation.save();
  res.json({ message: "Réservation mise à jour" });
};

// DELETE /catways/:id/reservations/:idReservation
exports.deleteReservation = async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);
  if (reservation) res.json({ message: "Réservation supprimée" });
  else res.status(404).json({ message: "Réservation non trouvée" });
};
