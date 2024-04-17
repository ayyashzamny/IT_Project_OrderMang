import React, { useState } from "react";
import axios from "axios";
import { generateUserID, generateRentID } from "../utils/genId"; // Assuming you have utility functions to generate IDs
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const RentAndUserForm = () => {
  // Define the variables to store the generated IDs
  const initialUserID = generateUserID();
  const initialRentID = generateRentID();
  const currentDate = new Date().toISOString().slice(0, 10); // Current date in YYYY-MM-DD format

  const [userDetails, setUserDetails] = useState({
    UserID: initialUserID,
    FirstName: "",
    LastName: "",
    Email: "",
    Address: "",
    ContactNumber: "",
    Type: "offline", // Assuming default type is 'offline'
  });

  const [rentDetails, setRentDetails] = useState({
    UserID: initialUserID,
    RentID: initialRentID,
    ProductName: "",
    RentDate: currentDate, // Auto-select RentDate to current date
    ReturnDate: "",
    Payment: "",
    Description: "",
    Type: "Manual", // Assuming default type is 'manual'
    Status: "Rented", // Assuming default status is 'new'
  });

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleRentChange = (e) => {
    const { name, value } = e.target;
    setRentDetails({
      ...rentDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add user
      const userResponse = await axios.post(
        "http://localhost:8070/user/addUser",
        userDetails
      );
      console.log(userResponse.data);

      // Add rent
      const rentResponse = await axios.post(
        "http://localhost:8070/rent/addRent",
        rentDetails
      );
      console.log(rentResponse.data);

      // Reset form after submission
      setUserDetails({
        UserID: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Address: "",
        ContactNumber: "",
        Type: "",
      });

      setRentDetails({
        RentID: "",
        ProductName: "",
        RentDate: currentDate, // Reset RentDate to current date
        ReturnDate: "",
        Payment: "",
        Description: "",
        Type: "",
        Status: "",
      });

      // Show success message using SweetAlert
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "User and rent added successfully.",
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
        <div class="col-2">
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
        <div class="col-8">
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

            {/* Rent Details */}
            <h3>Rent Details</h3>
            <div className="row">
              <div className="mb-3">
                <label className="form-label">Product Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="ProductName"
                  value={rentDetails.ProductName}
                  onChange={handleRentChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Rent Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="RentDate"
                    value={rentDetails.RentDate}
                    onChange={handleRentChange}
                    min={currentDate} // Set min date to current date
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Return Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="ReturnDate"
                    value={rentDetails.ReturnDate}
                    onChange={handleRentChange}
                    min={rentDetails.RentDate}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Payment:</label>
              <input
                type="text"
                className="form-control"
                name="Payment"
                value={rentDetails.Payment}
                onChange={handleRentChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description:</label>
              <textarea
                className="form-control"
                name="Description"
                value={rentDetails.Description}
                onChange={handleRentChange}
              ></textarea>
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

export default RentAndUserForm;
