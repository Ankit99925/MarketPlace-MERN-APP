import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessages from "../ErrorMessages";
import { fetchCustomerData } from "../../store/slices/customerSlice";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();

  const { products, orders, isLoading, errorMessages } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(fetchCustomerData());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="text-green-700 font-semibold text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 p-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold text-green-800 dark:text-white mb-6 text-center">
        Your Orders
      </h1>

      {!isLoading && errorMessages && errorMessages.length > 0 && (
        <ErrorMessages errorMessages={errorMessages} />
      )}
      {!isLoading && orders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders?.map((order) => (
            <Order key={order._id} order={order} products={products} />
          ))}
        </div>
      )}
      {!isLoading && orders.length === 0 && (
        <div className="flex justify-center items-center">
          <div className="text-green-700 font-semibold text-lg">
            No products found.
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
