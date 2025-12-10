const Reservation = require("../models/Reservation");

exports.getReservations = async (req, res) => {
  const reservations = await Reservation.find({ catwayNumber: req.params.catwayNumber });
  res.json(reservations);
};

exports.getReservation = async (req, res) => {
  const reservation = await Reservation.findOne({
    _id: req.params.idReservation,
    catwayNumber: req.params.catwayNumber
  });
  if (!reservation)
    return res.status(404).json({ message: "Réservation non trouvée" });

  res.json(reservation);
};

exports.createReservation = async (req, res) => {
  const reservation = await Reservation.create({
    ...req.body,
    catwayNumber: req.params.catwayNumber
  });
  res.json(reservation);
};

exports.updateReservation = async (req, res) => {
  const reservation = await Reservation.findOneAndUpdate(
    { _id: req.params.idReservation, catwayNumber: req.params.catwayNumber },
    req.body,
    { new: true }
  );
  res.json(reservation);
};

exports.deleteReservation = async (req, res) => {
  await Reservation.deleteOne({
    _id: req.params.idReservation,
    catwayNumber: req.params.catwayNumber
  });
  res.json({ message: "Réservation supprimée" });
};
