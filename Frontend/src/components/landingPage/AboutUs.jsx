import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
      <div className="md:flex">
        <div className="md:w-1/2">
          <img
            src="../images/aboutus/aboutus.jpg"
            alt="About Us"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <SectionHeader title="About Green Nursery" />
          <p className="text-gray-600 mb-6">
            We are passionate about bringing greenery into every home. At our
            nursery, we provide quality plants, seeds, and garden care
            essentials to make gardening joyful and accessible for all.
          </p>
          <p className="text-gray-600 mb-6">
            Our team of expert horticulturists carefully selects and nurtures
            each plant to ensure they thrive in your home. We believe that
            everyone deserves to experience the joy and benefits of living with
            plants.
          </p>
          <Link
            to="/about"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium inline-block w-fit"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
