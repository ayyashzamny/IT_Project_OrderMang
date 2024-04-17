const router = require("express").Router();
const Order = require("../models/OrderDetail"); // Assuming your schema file is named "Order.js"

// Create a new order
router.route("/addOrder").post((req, res) => {
  const {
    OrderID,
    ProductName,
    UserID,
    OrderDate,
    DeliveryDate,
    Status,
    TotalAmount,
    Type,
    Description,
  } = req.body;

  const newOrder = new Order({
    OrderID,
    ProductName,
    UserID,
    OrderDate: new Date(OrderDate), // Assuming OrderDate is in ISO format or a format that can be parsed by Date constructor
    DeliveryDate: new Date(DeliveryDate), // Assuming DeliveryDate is in ISO format or a format that can be parsed by Date constructor
    Status,
    TotalAmount,
    Type,
    Description,
  });

  newOrder
    .save()
    .then(() => res.status(200).json({ status: "New Order Added" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get all orders
router.route("/getAllOrders").get((req, res) => {
  Order.find()
    .then((orders) => res.status(200).json(orders))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Update an order by ID
router.route("/updateOrder/:id").put((req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  Order.findByIdAndUpdate(id, updateData, { new: true })
    .then((updatedOrder) => res.status(200).json(updatedOrder))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Delete an order by ID
router.route("/deleteOrder/:id").delete((req, res) => {
  const { id } = req.params;

  Order.findByIdAndDelete(id)
    .then(() => res.status(200).json({ status: "Order deleted successfully" }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

// Get an order by ID
router.route("/getOrderById/:id").get((req, res) => {
  const { id } = req.params;

  Order.findById(id)
    .then((order) => res.status(200).json(order))
    .catch((err) => res.status(400).json({ error: err.message }));
});

module.exports = router;
