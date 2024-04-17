import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { generateOrderID } from "../utils/genId";
import { Link } from "react-router-dom";

const OrderForm = () => {
  const initialOrderID = generateOrderID();

  const [formData, setFormData] = useState({
    OrderID: initialOrderID,
    ProductName: "",
    UserID: "",
    OrderDate: new Date().toISOString().slice(0, 10),
    DeliveryDate: "",
    Status: "New",
    TotalAmount: "",
    Type: "Manual",
    Description: "",
  });

  const [userIDs, setUserIDs] = useState([]);
  const [filteredUserIDs, setFilteredUserIDs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/user/getAllUsers") // Assuming this endpoint fetches all users
      .then((response) => {
        const users = response.data;
        const onlineUserIDs = users.map((user) => user.UserID);
        setUserIDs(onlineUserIDs);
        setFilteredUserIDs(onlineUserIDs);
      })
      .catch((error) => {
        console.error("Error fetching user IDs:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    const filteredIDs = userIDs.filter((userID) =>
      userID.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUserIDs(filteredIDs);
  };

  const handleUserIDChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      UserID: e.target.value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:8070/order/addOrder", formData)
      .then(() => {
        // Show success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Thank you for your order! We have received your request.",
          showConfirmButton: false,
          timer: 1700, // Auto close after 1.7 seconds
          customClass: {
            title: "my-title-class", // Define a custom class for the title
          },
        });

        // Reset form after successful submission
        setFormData({
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
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        // Handle error feedback to user if necessary
      });
  }

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
          <h2>Add New Order</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="ProductName" className="form-label">
                Product Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="ProductName"
                name="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="UserID" className="form-label">
                User ID:
              </label>
              <input
                type="text"
                className="form-control"
                id="UserID"
                name="UserID"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search or Select User ID"
              />
              <select
                className="form-select mt-2"
                onChange={handleUserIDChange}
                value={formData.UserID}
              >
                <option value="" disabled>
                  Select User ID
                </option>
                {filteredUserIDs.map((userID) => (
                  <option key={userID} value={userID}>
                    {userID}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="DeliveryDate" className="form-label">
                  Delivery Date:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="DeliveryDate"
                  value={formData.DeliveryDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]} // Set min date to today
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="TotalAmount" className="form-label">
                  Total Amount:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="TotalAmount"
                  name="TotalAmount"
                  value={formData.TotalAmount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="Description" className="form-label">
                  Description:
                </label>
                <textarea
                  className="form-control"
                  id="Description"
                  name="Description"
                  value={formData.Description}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
