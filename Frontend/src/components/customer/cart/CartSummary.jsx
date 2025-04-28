import { useDispatch, useSelector } from "react-redux";
import { setCheckoutProducts } from "../../../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get products from Redux state
  const { products, cart } = useSelector((state) => state.customer);
  const productsInCart = [...products].filter((product) =>
    cart.includes(product._id)
  );

  let totalPrice = 0;
  for (const product of productsInCart) {
    totalPrice += product.price;
  }
  const tax = totalPrice * 0.1;
  const shipping = totalPrice === 0 || totalPrice > 1200 ? 0 : 10; // Free shipping for orders over $100
  const finalPrice = totalPrice + tax + shipping;

  const handleCheckout = () => {
    // Make sure we're passing both products and finalPrice
    dispatch(
      setCheckoutProducts({
        products: productsInCart,
        finalPrice: finalPrice, // This matches the state property name
      })
    );
    navigate("/checkout");
  };

  return (
    <div
      className="bg-gradient-to-br from-green-50 to-green-100
  dark:from-gray-800 dark:to-gray-800
  shadow-lg rounded-2xl p-8
  dark:text-white"
    >
      <h2 className="text-3xl font-extrabold text-green-800 dark:text-white mb-6 text-center">
        Cart Summary
      </h2>
      <div className="mb-6 space-y-4">
        <p className="text-lg text-green-700 dark:text-gray-300 flex justify-between">
          <span>Total Price:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </p>
        <p className="text-lg text-green-700 dark:text-gray-300 flex justify-between">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </p>
        <p className="text-lg text-green-700 dark:text-gray-300 flex justify-between">
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </p>
        <p className="text-xl font-bold text-green-900 dark:text-gray-300 flex justify-between border-t pt-4">
          <span>Final Price:</span>
          <span>${finalPrice.toFixed(2)}</span>
        </p>
      </div>
      <button
        disabled={productsInCart.length === 0}
        onClick={handleCheckout}
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
