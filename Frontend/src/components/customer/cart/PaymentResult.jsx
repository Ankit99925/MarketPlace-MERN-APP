import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCustomerData } from "../../../store/slices/customerSlice";
import axios from "axios";
import config from "../../../config/config";

const PaymentResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    console.log("PaymentResult component mounted");
    console.log("Current location:", location.pathname + location.search);

    // Check if this is a success or canceled status
    const queryParams = new URLSearchParams(location.search);
    const resultStatus = queryParams.get("status");
    const sessionId = queryParams.get("session_id");

    console.log("Status from URL:", resultStatus);
    console.log("Session ID from URL:", sessionId);

    // Handle cancel status
    if (resultStatus === "canceled") {
      console.log("Payment was canceled");
      setStatus("failed");
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
      return;
    }

    // If no session ID, try to get it from the status parameter (for backward compatibility)
    const finalSessionId = sessionId || queryParams.get("status");

    if (!finalSessionId) {
      console.log("No session ID found, redirecting to cart");
      navigate("/cart");
      return;
    }

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        console.log("JWT token exists:", !!token);

        if (!token) {
          setStatus("error");
          console.log("No JWT token, redirecting to cart");
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
          return;
        }

        const apiUrl = `${config.API_URL}/api/customer/check-payment-result/${finalSessionId}`;
        console.log("Making API request to:", apiUrl);

        const response = await axios.get(apiUrl, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API response:", response.data);

        if (response.data.paymentDetails === "paid") {
          console.log("Payment successful, redirecting to orders");
          setStatus("success");
          await dispatch(fetchCustomerData()).unwrap();
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
        } else {
          console.log("Payment failed, redirecting to cart");
          setStatus("failed");
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        console.log("Error response:", error.response?.data);
        setStatus("error");
        setTimeout(() => {
          navigate("/cart");
        }, 2000);
      }
    };

    checkStatus();
  }, [dispatch, navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {status === "processing" && (
          <div>
            <h2 className="text-xl mb-2">Processing your payment...</h2>
            <p className="text-gray-600">
              Please wait while we confirm your order
            </p>
          </div>
        )}

        {status === "success" && (
          <div>
            <h2 className="text-xl text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600">Redirecting to your orders...</p>
          </div>
        )}

        {status === "failed" && (
          <div>
            <h2 className="text-xl text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-600">Redirecting to cart...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <h2 className="text-xl text-red-600 mb-2">Something went wrong</h2>
            <p className="text-gray-600">Redirecting to cart...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResult;
