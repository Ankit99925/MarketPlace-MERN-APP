import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import config from "../../../config/config";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkoutData = useSelector((state) => ({
    products: state.customer.checkoutProducts || [],
    finalPrice: state.customer.finalPrice,
  }));
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const redirectToCheckout = async () => {
      if (checkoutData.products.length === 0) {
        navigate("/cart");
        return;
      }

      try {
        setLoading(true);

        // Create checkout session
        const { data } = await axios.post(
          `${config.API_URL}/api/customer/create-checkout-session`,
          {
            products: checkoutData.products,
            finalPrice: checkoutData.finalPrice,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.id,
        });

        if (error) {
          setError(error.message);
        }
      } catch (err) {
        setError("Failed to start checkout. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    redirectToCheckout();
  }, [checkoutData, token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {loading && (
          <div>
            <h2 className="text-2xl mb-4">Preparing your checkout...</h2>
            <p className="text-gray-600">
              You'll be redirected to Stripe to complete your payment.
            </p>
          </div>
        )}

        {error && (
          <div>
            <h2 className="text-2xl text-red-600 mb-4">Checkout Error</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => navigate("/cart")}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Return to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
