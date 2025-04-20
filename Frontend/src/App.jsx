import NavBar from "./nav/NavBar";
import AddProduct from "./components/seller/AddProduct";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./components/customer/cart/Cart";
import Orders from "./components/customer/Orders";
import EditProduct from "./components/seller/EditProduct";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import VerifyOtp from "./components/auth/VerifyOtp";
import LandingPage from "./components/landingPage/LandingPage";
import Checkout from "./components/customer/cart/Checkout";
import PaymentResult from "./components/customer/cart/PaymentResult";
import GoogleAuth from "./components/auth/GoogleAuth";
import PlantsPage from "./components/plants/PlantsPage";
import IndoorPlants from "./components/plants/IndoorPlants";
import OutdoorPlants from "./components/plants/OutdoorPlants";
import HangingPlants from "./components/plants/HangingPlants";
import SeedsPage from "./components/seeds/SeedsPage";
import FlowerSeeds from "./components/seeds/FlowerSeeds";
import HerbSeeds from "./components/seeds/HerbSeeds";
import VegetableSeeds from "./components/seeds/VegetableSeeds";
import PlantCare from "./components/plantCare/PlantCare";
import NotFound from "./components/shared/NotFound";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import PlantLoader from "./components/shared/PlantLoader";
import { useEffect } from "react";
import { fetchCustomerData } from "./store/slices/customerSlice";
import { fetchSellerProducts } from "./store/slices/sellerSlice";
import SellerDashboard from "./components/seller/sellerDashboard/src/SellerDashboard";
import CustomerProfile from "./components/customer/CustomerProfile";
import ModalContainer from "./components/shared/ModalContainer";
import SearchPage from "./components/shared/SearchResults";
import Layout from "./components/layout/Layout";

function AppRoutes() {
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === "Customer") {
        dispatch(fetchCustomerData());
      } else if (userType === "Seller") {
        dispatch(fetchSellerProducts());
      }
    }
  }, [isAuthenticated, userType, dispatch]);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Landing page - no filters */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth routes - no filters */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/auth/google" element={<GoogleAuth />} />

        {/* Filterable routes */}
        <Route element={<Layout />}>
          <Route path="/search" element={<SearchPage />} />

          {/* Product Category Routes */}
          <Route path="/plants" element={<PlantsPage />} />
          <Route path="/plants/indoor" element={<IndoorPlants />} />
          <Route path="/plants/outdoor" element={<OutdoorPlants />} />
          <Route path="/plants/hanging" element={<HangingPlants />} />
          <Route path="/seeds" element={<SeedsPage />} />
          <Route path="/seeds/flower" element={<FlowerSeeds />} />
          <Route path="/seeds/herb" element={<HerbSeeds />} />
          <Route path="/seeds/vegetable" element={<VegetableSeeds />} />
          <Route path="/plant-care" element={<PlantCare />} />
        </Route>

        {isAuthenticated && userType === "Seller" && (
          <>
            <Route path="/sellerDashboard/*" element={<SellerDashboard />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
          </>
        )}
        {isAuthenticated && userType === "Customer" && (
          <>
            <Route path="/myProfile" element={<CustomerProfile />} />
            <Route path="/orders" element={<Orders />} />
          </>
        )}

        {/* Non-filterable protected routes */}
        {isAuthenticated && userType === "Customer" && (
          <>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-result" element={<PaymentResult />} />
          </>
        )}

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={2000} />
      <ModalContainer />
    </>
  );
}

// Main App component
function App() {
  return (
    <PersistGate loading={<PlantLoader />} persistor={persistor}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PersistGate>
  );
}

export default App;
