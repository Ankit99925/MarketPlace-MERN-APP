import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import "./css/style.css";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import OrderList from "./pages/Orderlist";
import ProfilePage from "./pages/ProfilePage";

function SellerDashboard() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <ThemeProvider>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/productlist" element={<ProductList />} />
        <Route exact path="/orderlist" element={<OrderList />} />
        <Route exact path="/profile" element={<ProfilePage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default SellerDashboard;
