import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Hero = () => {
  const heroSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&h=800&q=80",
      title: "Bring Nature Home",
      subtitle:
        "Discover our curated collection of plants, seeds, and gardening essentials",
      buttonText: "Shop Now",
      buttonLink: "/plants",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1466692476655-ab0c26c69cbf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&h=800&q=80",
      title: "Grow Your Own Food",
      subtitle: "Start your organic garden with our premium seeds and supplies",
      buttonText: "Explore Seeds",
      buttonLink: "/seeds",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&h=800&q=80",
      title: "Plant Care Essentials",
      subtitle: "Everything your plants need to thrive and grow beautifully",
      buttonText: "Shop Plant Care",
      buttonLink: "/plant-care",
    },
  ];
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          className="h-[500px]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-lg">
                      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        {slide.title}
                      </h1>
                      <p className="text-gray-200 mb-8">{slide.subtitle}</p>
                      <Link
                        to={slide.buttonLink}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium inline-block"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Hero;
