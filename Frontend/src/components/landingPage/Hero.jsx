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
      image: "/images/hero/plants.jpg",
      title: "Bring Nature Home",
      subtitle:
        "Discover our curated collection of plants, seeds, and gardening essentials",
      buttonText: "Shop Now",
      buttonLink: "/plants",
    },
    {
      id: 2,
      image: "/images/hero/seeds.jpg",
      title: "Grow Your Own Food",
      subtitle: "Start your organic garden with our premium seeds and supplies",
      buttonText: "Explore Seeds",
      buttonLink: "/seeds",
    },
    {
      id: 3,
      image: "/images/hero/planttools.jpg",
      title: "Plant Care Essentials",
      subtitle: "Everything your plants need to thrive and grow beautifully",
      buttonText: "Shop Plant Care",
      buttonLink: "/plant-care",
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="h-[500px] [&_.swiper-button-next]:!text-white [&_.swiper-button-prev]:!text-white [&_.swiper-button-next::after]:!text-sm [&_.swiper-button-prev::after]:!text-sm"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full">
                {/* Image Container */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/30 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 z-20 flex items-center">
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
