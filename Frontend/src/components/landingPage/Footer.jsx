import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="container mx-auto px-4 pt-12 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              MarketPlace
            </h3>
            <p className="mb-4 text-gray-400">
              Your one-stop destination for premium plants and gardening
              supplies. From indoor to outdoor plants, we offer everything you
              need to create your green paradise.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaPinterest size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/category/indoor"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/category/outdoor"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/category/succulents"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Succulents
                </Link>
              </li>
              <li>
                <Link
                  to="/category/seeds"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Seeds & Bulbs
                </Link>
              </li>
              <li>
                <Link
                  to="/category/tools"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gardening Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <address className="not-italic text-gray-400">
              <p className="mb-3">1234 Market Street</p>
              <p className="mb-3">San Francisco, CA 94103</p>
              <p className="mb-3">
                <a
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="mailto:support@marketplace.com"
                  className="hover:text-white transition-colors"
                >
                  support@marketplace.com
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar with copyright and additional links */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © {currentYear} MarketPlace. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/shipping"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Shipping Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
