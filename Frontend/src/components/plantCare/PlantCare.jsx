import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import {
  fetchFilteredProducts,
  resetFilters,
  setFilters,
} from "../../store/slices/publicSlice";
import { useDispatch, useSelector } from "react-redux";
import PlantLoader from "../shared/PlantLoader";

const PlantCare = () => {
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useSelector((state) => state.public);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(resetFilters());
    dispatch(setFilters({ category: "Plant Care" }));
    dispatch(fetchFilteredProducts());
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Plant Care Collection
        </h1>
        <PlantLoader />
      </div>
    );
  }
  if (filteredProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          No products in Plant Care Collection
        </h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Plant Care Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantCare;
