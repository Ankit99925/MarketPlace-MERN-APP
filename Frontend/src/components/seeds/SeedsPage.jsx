import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProducts } from "../../store/slices/publicSlice";
import PlantLoader from "../shared/PlantLoader";
import ProductCard from "../shared/ProductCard";

const SeedsPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error } = useSelector((state) => state.public);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    dispatch(fetchPublicProducts("Seed"));
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Seeds Collection
        </h1>
        <PlantLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Seeds Collection
        </h1>
        <div className="text-red-500 text-center">{error}</div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Seeds Collection
        </h1>
        <div className="text-center">No seeds available.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Seeds Collection
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

export default SeedsPage;
