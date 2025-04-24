import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";

const Featured = () => {
  const featuredCategories = [
    {
      id: 1,
      title: "Plants",
      image: "/images/categories/plantsCollection.jpg",
      link: "/plants?category=indoor",
    },
    {
      id: 2,
      title: "Seeds",
      image: "/images/categories/seedsCollection.jpg",
      link: "/seeds",
    },
    {
      id: 3,
      title: "Plant Care",
      image: "/images/categories/plantCareCollection.jpg",
      link: "/plant-care",
    },
    {
      id: 4,
      title: "Garden Tools",
      image: "/images/categories/gardenToolsCollection.jpg",
      link: "/plant-care?category=tools",
    },
  ];
  return (
    <>
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">
            Organic & Sustainable
          </h3>
          <p className="text-gray-600">
            All our plants and products are grown and sourced sustainably
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Expert Care Advice</h3>
          <p className="text-gray-600">
            Get personalized plant care tips from our gardening experts
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <h3 className="font-bold text-gray-800 mb-2">Fast & Safe Delivery</h3>
          <p className="text-gray-600">
            Plants carefully packaged and delivered to your doorstep
          </p>
        </div>
      </div>
      <SectionHeader
        title="Shop by Category"
        subtitle="Find exactly what you're looking for"
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        {featuredCategories.map((category) => (
          <Link
            to={category.link}
            key={category.id}
            className="group relative rounded-xl overflow-hidden shadow-lg h-80"
          >
            <img
              src={category.image}
              alt={category.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent flex flex-col justify-end p-6">
              <h3 className="text-white font-bold text-xl mb-2">
                {category.title}
              </h3>
              <span className="text-gray-200 text-sm">Shop Now</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Featured;
