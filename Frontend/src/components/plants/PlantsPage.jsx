import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import {
  fetchFilteredProducts,
  setFilters,
  resetFilters,
} from "../../store/slices/publicSlice";
import { useDispatch, useSelector } from "react-redux";
import PlantLoader from "../shared/PlantLoader";

const PlantsPage = () => {
  const dispatch = useDispatch();
  const { filteredProducts, isLoading } = useSelector((state) => state.public);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    // Reset filters before setting new ones
    dispatch(resetFilters());

    dispatch(fetchFilteredProducts("Plant")).unwrap();
  }, [dispatch]);

  if (isLoading) {
    return <PlantLoader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Plants Collection
      </h1>
      {filteredProducts?.length === 0 ? (
        <div className="text-center text-gray-600">
          No plants found. Please try different filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantsPage;
