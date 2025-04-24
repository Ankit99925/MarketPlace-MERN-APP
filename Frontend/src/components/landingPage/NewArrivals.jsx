import SectionHeader from "./SectionHeader";
import ProductCard from "../shared/ProductCard";
import { useSelector } from "react-redux";

const NewArrivals = () => {
  const { products, isLoading } = useSelector((state) => state.public);

  // Sort by creation date and get latest 4
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="mb-16">
        <SectionHeader
          title="New Arrivals"
          subtitle="Just added to our collection"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-64 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <SectionHeader
        title="New Arrivals"
        subtitle="Just added to our collection"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {newArrivals.length > 0 ? (
          newArrivals
            .slice(0, 4)
            .map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isAuthenticated={false}
              />
            ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No new products available
          </p>
        )}
      </div>
    </>
  );
};

export default NewArrivals;
