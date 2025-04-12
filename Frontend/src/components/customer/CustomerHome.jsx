import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerData,
  sortProducts,
} from "../../store/slices/customerSlice";

import ProductCard from "../shared/ProductCard";
import ErrorMessages from "../ErrorMessages";

const CustomerHome = () => {
  const dispatch = useDispatch();
  const { userType, isAuthenticated } = useSelector((state) => state.auth);

  const { cart, isLoading, searchTerm, sortedProducts } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    // Only fetch if authenticated as customer
    if (isAuthenticated && userType === "Customer") {
      dispatch(fetchCustomerData());
    }
  }, [dispatch, isAuthenticated, userType]);

  const handleSort = (e) => {
    const sortBy = e.target.value;
    console.log("Sorting by:", sortBy);
    dispatch(sortProducts({ sortBy, searchTerm }));
  };

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
      <div className="mb-4">
        <select
          onChange={handleSort}
          name="sorting"
          id="sorting"
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="indoor">Indoor Plants</option>
          <option value="outdoor">Outdoor Plants</option>
          <option value="hanging">Hanging Plants</option>
        </select>
      </div>
      {!isLoading && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product._id} product={product} cart={cart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerHome;
