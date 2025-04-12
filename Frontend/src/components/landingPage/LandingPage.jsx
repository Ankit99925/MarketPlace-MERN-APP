import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProducts } from "../../store/slices/publicSlice";
import { Link } from "react-router-dom";

import Hero from "./Hero";
import Featured from "./Featured";
import BestSellers from "./BestSellers";
import Testimonial from "./Testimonial";
import PlantCareSection from "./PlantCareSection";
import AboutUs from "./AboutUs";
import NewsLetter from "./NewsLetter";

import PlantLoader from "../shared/PlantLoader";

const LandingPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.public);
  // const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(fetchPublicProducts("all"));
  }, [dispatch]);

  return isLoading ? (
    <PlantLoader />
  ) : (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <Hero />

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section */}
        <Featured />

        {/* Best Sellers */}
        <BestSellers />

        {/* Testimonials */}
        <Testimonial />

        {/* Plant Care Section */}
        <PlantCareSection />

        {/* About Us */}
        <AboutUs />

        {/* Newsletter */}
        <NewsLetter />
      </div>
    </div>
  );
};

export default LandingPage;
