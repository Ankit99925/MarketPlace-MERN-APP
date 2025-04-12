import React, { useEffect } from "react";
import ProductCard from "../shared/ProductCard";
import { fetchPublicProducts } from "../../store/slices/publicSlice";
import { useDispatch, useSelector } from "react-redux";
import PlantLoader from "../shared/PlantLoader";

const PlantsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.public);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    dispatch(fetchPublicProducts("Plant"));
  }, [dispatch]);
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Plants Collection
        </h1>
        <PlantLoader />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Plants Collection
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product) => (
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

export default PlantsPage;
