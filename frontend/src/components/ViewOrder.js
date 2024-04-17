import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderList = () => {
  const [newOrders, setNewOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios
      .get("http://localhost:8070/order/getAllOrders")
      .then((response) => {
        const newOrders = response.data.filter(
          (order) => order.Status === "New"
        );
        const pendingOrders = response.data.filter(
          (order) => order.Status === "Pending"
        );
        setNewOrders(newOrders);
        setPendingOrders(pendingOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  const fetchUserDetails = (userId) => {
    axios
      .get(`http://localhost:8070/user/getUserByUserID/${userId}`)
      .then((response) => {
        setSelectedUser(response.data);
        setShowModal(true);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  };

  const handleStatusChange = (id, status) => {
    axios
      .put(`http://localhost:8070/order/updateOrder/${id}`, { Status: status })
      .then(() => {
        fetchOrders();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    const userId = order.UserID;
    await fetchUserDetails(userId);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNewOrders = newOrders.filter((order) =>
    order.OrderID.includes(searchQuery)
  );

  const filteredPendingOrders = pendingOrders.filter((order) =>
    order.OrderID.includes(searchQuery)
  );

  return (
    <div className="container mt-5">
      <h2>New Orders</h2>
      <div style={{ height: "10px" }}></div>

      <div class="row">
        <div class="col-10">
          <Form.Group controlId="formBasicSearch">
            <Form.Control
              type="text"
              placeholder="Search by Order ID"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form.Group>
        </div>
        <div class="col-2">
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Table
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link to="/ManageOrder" className="dropdown-item">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/ManageRent" className="dropdown-item">
                  Rentals
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link to="/AllOrders" className="dropdown-item">
                  All Orders
                </Link>
              </li>
              <li>
                <Link to="/AllRentals" className="dropdown-item">
                  All Rentals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ height: "34px" }}></div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Total Amount</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {filteredNewOrders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.ProductName}</td>
              <td>{order.UserID}</td>
              <td>{formatDate(order.OrderDate)}</td>
              <td>{formatDate(order.DeliveryDate)}</td>
              <td>{order.TotalAmount}</td>
              <td>{order.Description}</td>
              <td>{order.Type}</td>
              <td>
                {order.Status !== "Finished" && (
                  <Button
                    variant="warning"
                    onClick={() => handleStatusChange(order._id, "Pending")}
                  >
                    Pending
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(order)}
                >
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div style={{ height: "10px" }}></div>
      <h2>Pending Orders</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>User ID</th>
            <th>Order Date</th>
            <th>Delivery Date</th>
            <th>Total Amount</th>
            <th>Description</th>
            <th>Type</th>
            <th>Actions</th>
            <th>View More</th>
          </tr>
        </thead>
        <tbody>
          {filteredPendingOrders.map((order) => (
            <tr key={order.OrderID}>
              <td>{order.OrderID}</td>
              <td>{order.ProductName}</td>
              <td>{order.UserID}</td>
              <td>{formatDate(order.OrderDate)}</td>
              <td>{formatDate(order.DeliveryDate)}</td>
              <td>{order.TotalAmount}</td>
              <td>{order.Description}</td>
              <td>{order.Type}</td>
              <td>
                {order.Status !== "Finished" && (
                  <Button
                    variant="success"
                    onClick={() => handleStatusChange(order._id, "Finished")}
                  >
                    Finish
                  </Button>
                )}
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(order)}
                >
                  More
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
        <div style={{ height: "20px" }}></div>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && selectedUser && (
            <div>
              <p>
                <strong>User ID:</strong> {selectedOrder.UserID}
              </p>
              <p>
                <strong>User Name:</strong> {selectedUser.FirstName}{" "}
                {selectedUser.LastName}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.Email}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.Address}
              </p>
              <p>
                <strong>Contact Number:</strong> {selectedUser.ContactNumber}
              </p>
              <p>
                <strong>Customer Type:</strong> {selectedUser.Type}
              </p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderList;
