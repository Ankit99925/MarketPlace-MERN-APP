import React from "react";
import ProductCard from "../shared/ProductCard";

const IndoorPlants = () => {
  const indoorPlants = dummyPlants.filter(
    (plant) => plant.category === "indoor"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Indoor Plants</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {indoorPlants.map((plant) => (
          <ProductCard key={plant._id} product={plant} />
        ))}
      </div>
    </div>
  );
};

export default IndoorPlants;
