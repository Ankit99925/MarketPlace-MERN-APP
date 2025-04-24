import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import config from "../../../config/config";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback } from "react";
import { useSelector } from "react-redux";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const checkoutData = useSelector((state) => ({
    products: state.customer.checkoutProducts || [],
    finalPrice: state.customer.finalPrice,
  }));
  const token = localStorage.getItem("jwtToken");

  const fetchClientSecret = useCallback(async () => {
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
    return data.clientSecret;
  }, [checkoutData]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default Checkout;
