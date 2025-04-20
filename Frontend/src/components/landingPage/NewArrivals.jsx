import SectionHeader from "./SectionHeader";
import ProductCard from "../shared/ProductCard";
import { useSelector } from "react-redux";

const NewArrivals = () => {
  const { products } = useSelector((state) => state.public);

  console.log(products);

  return (
    <>
      {/* New Arrivals */}
      <SectionHeader
        title="New Arrivals"
        subtitle="Just added to our collection"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {products &&
          products
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </>
  );
};

export default NewArrivals;
