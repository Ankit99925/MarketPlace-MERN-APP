const VegetableSeeds = () => {
  // Filter only vegetable seeds
  const vegetableSeeds = dummySeeds.filter(
    (seed) => seed.category === "vegetable"
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-green-800">
        Vegetable Seeds
      </h1>
      <p className="text-gray-600 mb-8">
        Browse our selection of high-quality vegetable seeds. From tomatoes to
        carrots, find everything you need to grow your own vegetables at home.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vegetableSeeds.map((seed) => (
          <div
            key={seed._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={seed.imageUrl}
              alt={seed.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                {seed.productName}
              </h2>
              <p className="text-gray-600 text-sm mb-2">Brand: {seed.brand}</p>
              <p className="text-green-700 font-bold mb-2">
                ${seed.price.toFixed(2)}
              </p>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {seed.description}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-600">
                    {seed.rating}
                  </span>
                </div>
                <button className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VegetableSeeds;
