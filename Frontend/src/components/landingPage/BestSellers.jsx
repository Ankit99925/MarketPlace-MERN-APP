import SectionHeader from "./SectionHeader";
import ProductCard from "../shared/ProductCard";
import { useSelector } from "react-redux";

const BestSellers = () => {
  const { products } = useSelector((state) => state.public);
  const bestSellers = products.filter((product) => product.isFeatured);
  console.log(bestSellers);
  return (
    <>
      <SectionHeader title="Best Sellers" subtitle="Our customers' favorites" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {bestSellers &&
          bestSellers
            .slice(0, 4)
            .map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
      </div>
    </>
  );
};

export default BestSellers;
