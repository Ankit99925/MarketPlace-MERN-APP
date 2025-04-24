import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProducts } from "../../store/slices/publicSlice";

import Hero from "./Hero";
import Featured from "./Featured";
import BestSellers from "./BestSellers";
import Testimonial from "./Testimonial";
import PlantCareSection from "./PlantCareSection";
import AboutUs from "./AboutUs";
import NewsLetter from "./NewsLetter";
import NewArrivals from "./NewArrivals";
import PlantLoader from "../shared/PlantLoader";
import ContactUs from "./ContactUs";
import Footer from "./Footer";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.public);

  useEffect(() => {
    dispatch(fetchPublicProducts());
  }, [dispatch]);

  return isLoading ? (
    <PlantLoader />
  ) : (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Hero Section */}
      <Hero />

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <Featured />

        {/* Best Sellers */}
        <BestSellers />

        {/* New Arrivals */}
        <NewArrivals />

        {/* Testimonials */}
        <Testimonial />

        {/* Plant Care Section */}
        <PlantCareSection />

        {/* About Us */}
        <AboutUs />

        {/* Contact Us */}
        <ContactUs />

        {/* Newsletter */}
        <NewsLetter />

        {/*Footer*/}
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
