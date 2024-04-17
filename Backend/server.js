const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const PORT = process.env.PORT || 8070;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connection success! For the Order Management System");
});

// Routes
const orderRouter = require("./routes/OrderDetails.js");
const rentRouter = require("./routes/RentDetails.js");
const userRouter = require("./routes/UserDetails.js");
// const reportRouter = require("./routes/reportRoutes.js"); // Corrected import

app.use("/order", orderRouter);
app.use("/rent", rentRouter);
app.use("/user", userRouter);
// app.use("/report", reportRouter); // Corrected route usage

// Server Listening
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
