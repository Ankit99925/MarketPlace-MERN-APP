import React from "react";
import { Routes, Route } from "react-router-dom";
import "./css/style.css";

// Import pages
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/Orderlist";
import ProfilePage from "./pages/ProfilePage";
import Feedback from "./pages/Feedback";
function SellerDashboard() {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/productlist" element={<ProductList />} />
      <Route exact path="/orderlist" element={<OrderList />} />
      <Route exact path="/profile" element={<ProfilePage />} />
      <Route exact path="/feedback" element={<Feedback />} />
    </Routes>
  );
}

export default SellerDashboard;
