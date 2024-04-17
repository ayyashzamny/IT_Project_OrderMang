const mongoose = require("mongoose");

const schema = mongoose.Schema;

const ordersSchema = new schema({
  OrderID: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  UserID: {
    type: String,
    required: false,
  },
  OrderDate: {
    type: Date,
    required: true,
  },
  DeliveryDate: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  TotalAmount: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
});

const orders = mongoose.model("orders", ordersSchema);

module.exports = orders;
