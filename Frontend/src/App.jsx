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
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyOtp from "./components/auth/VerifyOtp";
import LandingPage from "./components/LandingPage";
import Checkout from "./components/customer/cart/Checkout";
import PaymentResult from "./components/customer/cart/PaymentResult";
import GoogleAuth from "./components/auth/GoogleAuth";
function App() {
  const { isLoggedIn, userType } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              userType === "Seller" ? (
                <SellerHome />
              ) : (
                <CustomerHome />
              )
            ) : (
              <LandingPage />
            )
          }
        />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-result" element={<PaymentResult />} />
        <Route path="/auth/google" element={<GoogleAuth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
