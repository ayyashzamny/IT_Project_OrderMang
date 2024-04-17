const router = require("express").Router();
const Rent = require("../models/RentDetail"); // Assuming your schema file is named "Rent.js"

// Create a new rent
router.route("/addRent").post((req, res) => {
  const {
    UserID,
    RentID,
    ProductName,
    RentDate,
    ReturnDate,
    Payment,
    Description,
    Type,
    Status,
  } = req.body;

  const newRent = new Rent({
    UserID,
    RentID,
    ProductName,
    RentDate: new Date(RentDate), // Assuming RentDate is in ISO format or a format that can be parsed by Date constructor
    ReturnDate: new Date(ReturnDate), // Same assumption for ReturnDate
    Payment,
    Description,
    Type,
    Status,
  });

  newRent
    .save()
    .then(() => res.status(200).json({ status: "New Rent Added" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all rents
router.route("/getAllRents").get((req, res) => {
  Rent.find()
    .then((rents) => res.status(200).json(rents))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Update a rent by ID
router.route("/updateRent/:id").put((req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  Rent.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedRent) => res.status(200).json(updatedRent))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete a rent by ID
router.route("/deleteRent/:id").delete((req, res) => {
  const { id } = req.params;

  Rent.findByIdAndDelete(id)
    .then(() => res.status(200).json({ status: "Rent deleted successfully" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get a rent by ID
router.route("/getRentById/:id").get((req, res) => {
  const { id } = req.params;

  Rent.findById(id)
    .then((rent) => res.status(200).json(rent))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all rents by UserID
router.route("/getRentsByUserID/:userId").get((req, res) => {
  const { userId } = req.params;

  Rent.find({ UserID: userId })
    .then((rents) => res.status(200).json(rents))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
