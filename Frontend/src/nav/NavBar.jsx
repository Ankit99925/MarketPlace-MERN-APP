import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../utils/ThemeContext";
import { useState, useRef, useEffect, useCallback } from "react";
import { fetchCustomerProfile } from "../store/slices/customerSlice";
import { fetchSellerProfile } from "../store/slices/sellerSlice";
import {
  setFilters,
  resetFilters,
  fetchFilteredProducts,
} from "../store/slices/publicSlice";
import { debounce } from "lodash";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const { userId } = useSelector((state) => state.auth);
  const { isAuthenticated, userType, firstName, lastName } = useSelector(
    (state) => state.auth
  );
  const { profile } = useSelector((state) => state.customer);
  const { profile: sellerProfile } = useSelector((state) => state.seller);

  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setShowProfileDropdown(false);
  };
  useEffect(() => {
    if (isAuthenticated && userType === "Customer") {
      dispatch(fetchCustomerProfile(userId));
    }
    if (isAuthenticated && userType === "Seller") {
      dispatch(fetchSellerProfile(userId));
    }
  }, [dispatch]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const debouncedSearch = useCallback(
    debounce((search) => {
      if (search.trim()) {
        dispatch(setFilters({ search: search.trim() }));
        dispatch(fetchFilteredProducts({ search: search.trim() }));
        navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      } else {
        dispatch(resetFilters());
        dispatch(fetchFilteredProducts({}));
      }
    }, 500),
    [dispatch, navigate]
  );

  const handleSearchInput = (e) => {
    const search = e.target.value;
    debouncedSearch(search);
  };
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/logo/logo.jpg"
                  alt="Logo"
                />
                <span className="text-xl font-semibold text-green-800 dark:text-green-400">
                  Nursery Market
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Main Navigation Links with Dropdowns */}
              <div className="flex space-x-6">
                {/* Plants Dropdown */}
                <div className="relative group">
                  <Link
                    to="/plants"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-4"
                  >
                    <span>Plants</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <div
                    className={`absolute z-50 left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-b-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
                  >
                    <Link
                      to="/indoor-plants"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Indoor Plants
                    </Link>
                    <Link
                      to="/outdoor-plants"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Outdoor Plants
                    </Link>
                    <Link
                      to="/hanging-plants"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Hanging Plants
                    </Link>
                  </div>
                </div>

                {/* Seeds Dropdown */}
                <div className="relative group">
                  <Link
                    to="/seeds"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-4"
                  >
                    <span>Seeds</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <div
                    className={`absolute z-50 left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-b-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
                  >
                    <Link
                      to="/flower-seeds"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Flower Seeds
                    </Link>
                    <Link
                      to="/vegetable-seeds"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Vegetable Seeds
                    </Link>
                    <Link
                      to="/herb-seeds"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Herb Seeds
                    </Link>
                  </div>
                </div>

                {/* Pots & Planters Dropdown */}
                <div className="relative group">
                  <Link
                    to="/pots-planters"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-4"
                  >
                    <span>Pots & Planters</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <div
                    className={`absolute z-50 left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-b-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
                  >
                    <Link
                      to="/wooden-planters"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Wooden Planters
                    </Link>
                    <Link
                      to="/ceramic-pots"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Ceramic Pots
                    </Link>
                    <Link
                      to="/metal-planters"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Metal Planters
                    </Link>
                  </div>
                </div>

                {/* Plant Care Dropdown */}
                <div className="relative group">
                  <Link
                    to="/plant-care"
                    className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 py-4"
                  >
                    <span>Plant Care</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </Link>
                  <div
                    className={`absolute z-50 left-0 mt-0 w-48 bg-white dark:bg-gray-800 rounded-b-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300`}
                  >
                    <Link
                      to="/fertilizers"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Fertilizers
                    </Link>
                    <Link
                      to="/garden-tools"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Garden Tools
                    </Link>
                    <Link
                      to="/garden-decor"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                    >
                      Garden Decor
                    </Link>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative flex-1 max-w-xl">
                <input
                  onChange={handleSearchInput}
                  type="text"
                  placeholder="Search plants, seeds and more..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-6">
                {/* Theme Toggle */}
                <button
                  onClick={handleThemeSwitch}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  title={
                    theme === "dark"
                      ? "Switch to Light Mode"
                      : "Switch to Dark Mode"
                  }
                >
                  {theme === "dark" ? (
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  )}
                </button>

                {/* Cart Icon */}
                {isAuthenticated ? (
                  <Link
                    to="/cart"
                    className="p-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    title="Cart"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="p-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                    title="Login to view cart"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                )}

                {/* Login/Profile Icon */}
                {isAuthenticated ? (
                  <div className="relative">
                    <button
                      onClick={toggleProfileDropdown}
                      className="p-2 flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
                      title={`${firstName} ${lastName}`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Account</span>
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileDropdown && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50"
                      >
                        <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                          {profile.firstName} {profile.slastName}
                        </div>
                        {userType === "Customer" ? (
                          <>
                            <Link
                              to="/myProfile"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                            >
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                            >
                              My Orders
                            </Link>
                          </>
                        ) : (
                          <Link
                            to="/sellerDashboard"
                            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                          >
                            Seller Dashboard
                          </Link>
                        )}

                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link
                      to="/login"
                      className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 text-sm font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Login</span>
                    </Link>
                    <Link
                      to="/signup"
                      className="flex items-center space-x-1 text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 text-sm font-medium"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Sign up</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={handleThemeSwitch}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu with accordions */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white dark:bg-gray-800 shadow-lg`}
      >
        {/* Mobile menu content here - similar structure but with accordion-style dropdowns */}
        {!isAuthenticated && (
          <div className="px-4 py-3 space-y-2 border-t dark:border-gray-700">
            <Link
              to="/login"
              className="block w-full px-4 py-2 text-center text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block w-full px-4 py-2 text-center text-gray-700 dark:text-gray-200 hover:bg-green-50 dark:hover:bg-green-900 rounded-md text-base font-medium"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default NavBar;
