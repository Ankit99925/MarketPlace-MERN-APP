import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  isLoading,
  emptyMessage = "No products found",
}) => {
  console.log("ProductGrid received:", { products, isLoading }); // Debug log

  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {emptyMessage}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          isAuthenticated={isAuthenticated}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
