import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { sortProducts } from "../store/slices/customerSlice";
const NavBar = () => {
  const { isAuthenticated, userType, firstName, lastName, profilePicture } = useSelector((state) => state.auth);
  const { searchTerm, sortBy } = useSelector((state) => state.customer);
  
  console.log(isAuthenticated, userType, firstName, lastName, profilePicture);  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    dispatch(sortProducts({ sortBy, searchTerm }));
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-green-100 border-b border-green-300 shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center space-x-3">
        <img
          src="https://www.pexels.com/photo/woman-touching-green-leaves-of-potted-plant-5230980/"
          alt="MarketPlace Logo"
          className="h-12 rounded-full shadow-md"
        />
        <h1 className="text-2xl font-extrabold text-green-800">
          Nursery Market
        </h1>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-8">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search for plants, tools, and more..."
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

        {/* Login and Signup Buttons */}
        {!isAuthenticated && (
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
        )}
        {isAuthenticated && (
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
        )}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-lg"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
