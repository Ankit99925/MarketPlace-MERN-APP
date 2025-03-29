import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProducts } from "../store/slices/customerSlice";
import CustomerProductCard from "./customer/CustomerProductCard";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { sortedProducts, isLoading } = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Welcome to Our Marketplace
      </h1>
      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="text-green-700 font-semibold text-lg">
            Loading products...
          </div>
        </div>
      )}
      {!isLoading && sortedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <CustomerProductCard
              key={product._id}
              product={product}
              cart={[]}
              isPublic={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
