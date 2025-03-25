import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../store/slices/customerSlice";

import CustomerProductCard from "./CustomerProductCard";
import ErrorMessages from "../ErrorMessages";

const CustomerHome = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("jwtToken");

  const { products, cart, isLoading, errorMessages } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    dispatch(fetchCustomerData(token));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Your Products
      </h1>
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="text-green-700 font-semibold text-lg">
            Loading your products...
          </div>
        </div>
      )}{" "}
      {!isLoading && errorMessages && errorMessages.length > 0 && (
        <ErrorMessages errorMessages={errorMessages} />
      )}
      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <CustomerProductCard
              key={product._id}
              product={product}
              cart={cart} // Pass the cart state
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
