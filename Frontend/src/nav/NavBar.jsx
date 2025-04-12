import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { sortProducts } from "../store/slices/customerSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, userType, firstName, lastName, profilePicture } =
    useSelector((state) => state.auth);
  const { searchTerm, sortBy } = useSelector((state) => state.customer);

  console.log(isAuthenticated, userType, firstName, lastName, profilePicture);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(sortProducts({ sortBy, searchTerm }));
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-green-100 border-b border-green-300 shadow-lg">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-3">
        <img
          src="https://images.pexels.com/photos/5230980/pexels-photo-5230980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="MarketPlace Logo"
          className="h-12 rounded-full shadow-md"
        />
        <h1 className="text-2xl font-extrabold text-green-800">
          Nursery Market
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="flex-1 mx-8">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search for plants, seeds, and more..."
          className="w-full p-3 rounded-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-md"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-green-800 font-semibold hover:text-green-900"
        >
          Home
        </Link>

        {/* Plants Dropdown */}
        <div className="relative group">
          <Link
            to="/plants"
            className="text-green-800 font-semibold hover:text-green-900 cursor-pointer flex items-center"
          >
            Plants
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Link>
          <div className="absolute z-50 w-56 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
            <Link
              to="/plants/indoor"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Indoor Plants
            </Link>
            <Link
              to="/plants/outdoor"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Outdoor Plants
            </Link>
            <Link
              to="/plants/hanging"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Hanging Plants
            </Link>
          </div>
        </div>

        {/* Seeds Dropdown */}
        <div className="relative group">
          <Link
            to="/seeds"
            className="text-green-800 font-semibold hover:text-green-900 cursor-pointer flex items-center"
          >
            Seeds
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </Link>
          <div className="absolute z-50 w-56 py-2 mt-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
            <Link
              to="/seeds/flower"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Flower Seeds
            </Link>
            <Link
              to="/seeds/herb"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Herb Seeds
            </Link>
            <Link
              to="/seeds/vegetable"
              className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-700 transition-colors duration-200"
            >
              Vegetable Seeds
            </Link>
          </div>
        </div>

        {/* Plant Care Link */}
        <Link
          to="/plant-care"
          className="text-green-800 font-semibold hover:text-green-900"
        >
          Plant Care
        </Link>

        {isAuthenticated && userType === "Seller" && (
          <Link
            to="/addProduct"
            className="text-green-800 font-semibold hover:text-green-900"
          >
            Add Product
          </Link>
        )}
        {isAuthenticated && userType === "Customer" && (
          <div className="flex space-x-4">
            <Link
              to="/cart"
              className="text-green-800 font-semibold hover:text-green-900"
            >
              Cart
            </Link>
            <Link
              to="/orders"
              className="text-green-800 font-semibold hover:text-green-900"
            >
              Orders
            </Link>
          </div>
        )}

        {/* Auth Buttons */}
        {!isAuthenticated ? (
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-lg"
            >
              Signup
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-3">
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-green-800 font-semibold">
                {firstName} {lastName}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
