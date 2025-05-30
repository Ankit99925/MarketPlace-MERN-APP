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
    // Extract query parameters
    const queryParams = new URLSearchParams(
      location.search || window.location.search
    );
    const resultStatus = queryParams.get("status");
    const sessionId = queryParams.get("session_id");

    // Handle cancel status
    if (resultStatus === "canceled") {
      setStatus("failed");
      setTimeout(() => {
        navigate("/cart");
      }, 2000);
      return;
    }

    // If no explicit session ID, try to extract it from the status parameter
    // (for backward compatibility with the old URL format)
    const finalSessionId =
      sessionId ||
      (resultStatus && resultStatus.startsWith("cs_") ? resultStatus : null);

    if (!finalSessionId) {
      navigate("/cart");
      return;
    }

    const checkStatus = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        if (!token) {
          setStatus("error");
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
          return;
        }

        const apiUrl = `${config.API_URL}/api/customer/check-payment-result/${finalSessionId}`;

        const response = await axios.get(apiUrl, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.paymentDetails === "paid") {
          setStatus("success");
          await dispatch(fetchCustomerData()).unwrap();
          setTimeout(() => {
            navigate("/orders");
          }, 2000);
        } else {
          setStatus("failed");
          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        }
      } catch (error) {
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
