import NavBar from "./nav/NavBar";
import AddProduct from "./components/seller/AddProduct";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import SellerHome from "./components/seller/SellerHome";
import CustomerHome from "./components/customer/CustomerHome";
import Cart from "./components/customer/cart/Cart";
import Orders from "./components/customer/Orders";
import EditProduct from "./components/seller/EditProduct";

function App() {
  const { userType } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={userType === "Seller" ? <SellerHome /> : <CustomerHome />}
        />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
