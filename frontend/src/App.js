import "./App.css";
import Navbar from "./components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderAndUserForm from "./components/NewUserOrder";
import OrderExUserForm from "./components/ExUserOrder";
import RentAndUserForm from "./components/NewUserRent";
import RentExUserForm from "./components/ExUserRent";
import OrderList from "./components/ViewOrder";
import RentList from "./components/ViewRent";
import AllOrders from "./components/AllOrders";
import AllRentals from "./components/AllRentals";
import Report from "./components/Report";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrderAndUserForm />} />
          <Route path="/AddOrderExUser" element={<OrderExUserForm />} />
          <Route path="/AddRentNewUser" element={<RentAndUserForm />} />
          <Route path="/AddRentExUser" element={<RentExUserForm />} />
          <Route path="/ManageOrder" element={<OrderList />} />
          <Route path="/ManageRent" element={<RentList />} />
          <Route path="/AllOrders" element={<AllOrders />} />
          <Route path="/AllRentals" element={<AllRentals />} />
          <Route path="/Report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
