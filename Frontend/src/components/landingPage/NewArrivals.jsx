import SectionHeader from "./SectionHeader";
import ProductCard from "../shared/ProductCard";
import { useSelector } from "react-redux";

const NewArrivals = () => {
  const { seeds } = useSelector((state) => state.public);

  return (
    <>
      {/* New Arrivals */}
      <SectionHeader
        title="New Arrivals"
        subtitle="Just added to our collection"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {seeds &&
          seeds
            .slice(0, 4)
            .map((seed) => <ProductCard key={seed._id} product={seed} />)}
      </div>
    </>
  );
};

export default NewArrivals;
