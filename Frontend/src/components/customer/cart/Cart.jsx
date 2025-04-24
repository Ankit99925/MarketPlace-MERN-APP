import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../../store/slices/customerSlice";
import ErrorMessages from "../../ErrorMessages";
import CartItems from "./CartItem";
import CartSummary from "./CartSummary";
import PlantLoader from "../../shared/PlantLoader";

const Cart = () => {
  const dispatch = useDispatch();
  const { products, cart, isLoading, errorMessages } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(fetchCustomerData());
  }, [dispatch]);
  const productsInCart = products.filter((product) =>
    cart.includes(product._id)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Your Cart
        </h1>
        <PlantLoader />
      </div>
    );
  }

  if (errorMessages?.length > 0) {
    return (
      <div className="min-h-screen bg-green-50 p-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
          Your Cart
        </h1>
        <ErrorMessages errorMessages={errorMessages} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Your Cart
      </h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <CartItems products={productsInCart} />
        </div>
        <div className="w-full lg:w-1/3">
          <CartSummary products={productsInCart} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
