import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../nav/NavBar";
import LandingPage from "../components/landingPage/LandingPage";
import SellerHome from "../components/seller/SellerHome";
import CustomerHome from "../components/customer/CustomerHome";
import AddProduct from "../components/seller/AddProduct";
import EditProduct from "../components/seller/EditProduct";
import Cart from "../components/customer/cart/Cart";
import Orders from "../components/customer/Orders";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";
import VerifyOtp from "../components/auth/VerifyOtp";
import Checkout from "../components/customer/cart/Checkout";
import PaymentResult from "../components/customer/cart/PaymentResult";
import GoogleAuth from "../components/auth/GoogleAuth";
import PlantsPage from "../components/plants/PlantsPage";
import IndoorPlants from "../components/plants/IndoorPlants";
import OutdoorPlants from "../components/plants/OutdoorPlants";
import HangingPlants from "../components/plants/HangingPlants";
import SeedsPage from "../components/seeds/SeedsPage";
import FlowerSeeds from "../components/seeds/FlowerSeeds";
import HerbSeeds from "../components/seeds/HerbSeeds";
import VegetableSeeds from "../components/seeds/VegetableSeeds";
import PlantCare from "../components/plantCare/PlantCare";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              userType === "seller" ? (
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
        <Route path="/plants" element={<PlantsPage />} />
        <Route path="/plants/indoor" element={<IndoorPlants />} />
        <Route path="/plants/outdoor" element={<OutdoorPlants />} />
        <Route path="/plants/hanging" element={<HangingPlants />} />
        <Route path="/seeds" element={<SeedsPage />} />
        <Route path="/seeds/flower" element={<FlowerSeeds />} />
        <Route path="/seeds/herb" element={<HerbSeeds />} />
        <Route path="/seeds/vegetable" element={<VegetableSeeds />} />
        <Route path="/plant-care" element={<PlantCare />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
