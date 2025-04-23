import SectionHeader from "./SectionHeader";
import ProductCard from "../shared/ProductCard";
import { useSelector } from "react-redux";

const PlantCareSection = () => {
  const { products } = useSelector((state) => state.public);

  return (
    <>
      <SectionHeader
        title="Plant Care Essentials"
        subtitle="Everything your plants need to thrive"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {products &&
          products
            .filter((product) => product.category === "Plant Care")
            .slice(0, 4)
            .map((item) => <ProductCard key={item._id} product={item} />)}
      </div>
    </>
  );
};

export default PlantCareSection;
