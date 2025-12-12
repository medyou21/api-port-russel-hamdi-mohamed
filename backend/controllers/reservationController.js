const Reservation = require("../models/Reservation");

exports.getAll = async (req, res) => {
  res.json(await Reservation.find({ catwayNumber: req.params.id }));
};

exports.getOne = async (req, res) => {
  res.json(await Reservation.findById(req.params.idReservation));
};

exports.create = async (req, res) => {
  const newRes = await Reservation.create(req.body);
  res.json(newRes);
};

exports.update = async (req, res) => {
  const updated = await Reservation.findByIdAndUpdate(
    req.params.idReservation,
    req.body,
    { new: true }
  );
  res.json(updated);
};

exports.delete = async (req, res) => {
  await Reservation.findByIdAndDelete(req.params.idReservation);
  res.json({ message: "Réservation supprimée" });
};
