import React, { useState } from "react";
import axios from "axios";
import { generateOrderID } from "../utils/genId";
import { generateUserID } from "../utils/genId";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const OrderAndUserForm = () => {
  // Define the variables to store the generated IDs
  const initialOrderID = generateOrderID();
  const initialUserID = generateUserID();

  const [orderDetails, setOrderDetails] = useState({
    OrderID: initialOrderID,
    ProductName: "",
    UserID: initialUserID,
    OrderDate: new Date().toISOString().slice(0, 10),
    DeliveryDate: "",
    Status: "New",
    TotalAmount: "",
    Type: "Manual",
    Description: "",
  });

  const [userDetails, setUserDetails] = useState({
    UserID: initialUserID,
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    ContactNumber: "",
    Type: "offline",
  });

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails({
      ...orderDetails,
      [name]: value,
    });
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add order
      const orderResponse = await axios.post(
        "http://localhost:8070/order/addOrder",
        orderDetails
      );
      console.log(orderResponse.data);

      // Add user
      const userResponse = await axios.post(
        "http://localhost:8070/user/addUser",
        userDetails
      );
      console.log(userResponse.data);

      // Reset form after submission
      setOrderDetails({
        OrderID: "",
        ProductName: "",
        UserID: "",
        OrderDate: "",
        DeliveryDate: "",
        Status: "",
        TotalAmount: "",
        Type: "",
        Description: "",
      });
      setUserDetails({
        UserID: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        ContactNumber: "",
        Type: "",
      });

      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Order and user added successfully.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container col-md-10">
      <div style={{ height: "34px" }}></div>
      <div class="row">
        <div class="col-sm-2">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Form
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link to="/" className="dropdown-item">
                  New User Order
                </Link>
              </li>
              <li>
                <Link to="/AddOrderExUser" className="dropdown-item">
                  Existing User Order
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link to="/AddRentNewUser" className="dropdown-item">
                  New User Rental
                </Link>
              </li>
              <li>
                <Link to="/AddRentExUser" className="dropdown-item">
                  Existing User Rental
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm-8">
          <form onSubmit={handleSubmit}>
            {/* User Details */}
            <h3>User Details</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="FirstName"
                    value={userDetails.FirstName}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="LastName"
                    value={userDetails.LastName}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Contact Number:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="ContactNumber"
                    value={userDetails.ContactNumber}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="Email"
                    value={userDetails.Email}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Address:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Address"
                    value={userDetails.Address}
                    onChange={handleUserChange}
                    required
                  />
                </div>
              </div>
            </div>
            {/* Order Details */}
            <h3>Order Details</h3>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Product Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="ProductName"
                    value={orderDetails.ProductName}
                    onChange={handleOrderChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Delivery Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="DeliveryDate"
                    value={orderDetails.DeliveryDate}
                    onChange={handleOrderChange}
                    min={new Date().toISOString().split("T")[0]} // Set min date to today
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Total Amount:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="TotalAmount"
                    value={orderDetails.TotalAmount}
                    onChange={handleOrderChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Description:</label>
                  <textarea
                    className="form-control"
                    name="Description"
                    value={orderDetails.Description}
                    onChange={handleOrderChange}
                  ></textarea>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-dark mt-3">
              Submit
            </button>
            <div style={{ height: "34px" }}></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderAndUserForm;
