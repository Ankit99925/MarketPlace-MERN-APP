import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-lg w-full text-center">
          {/* 404 Graphic */}
          <div className="mb-8 relative">
            <div className="text-9xl font-bold text-green-600/20">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/plant-broken.svg"
                alt="Wilted plant"
                className="h-32"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            It seems like this page has withered away. The Plant you're looking
            for doesn't exist or has been moved.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
            <Link
              to="/shop"
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 font-medium px-6 py-3 rounded-lg transition-colors duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>

      {/* Footer section */}
      <div className="bg-white border-t border-gray-200 px-4 py-6 text-center text-gray-600">
        <p>
          Need help finding something?{" "}
          <Link
            to="/contact"
            className="text-green-600 font-medium hover:underline"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
