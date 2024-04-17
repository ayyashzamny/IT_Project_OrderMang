const mongoose = require("mongoose");

const schema = mongoose.Schema;

const rentSchema = new schema({
  UserID: {
    type: String,
    required: true,
  },
  RentID: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  RentDate: {
    type: Date,
    required: true,
  },
  ReturnDate: {
    type: Date,
    required: true,
  },
  Payment: {
    type: Number,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
});

const rent = mongoose.model("rent", rentSchema);

module.exports = rent;
