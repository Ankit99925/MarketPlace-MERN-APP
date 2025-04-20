import { useDispatch, useSelector } from "react-redux";
import {
  resetFilters,
  setFilters,
  fetchFilteredProducts,
} from "../../../store/slices/publicSlice";

const FilterSidebar = ({ isOpen, onClose, className = "" }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.public);

  const handleFilterChange = (key, value) => {
    // Create a new filter object
    const newFilters = {
      ...filters,
      [key]: filters[key] === value ? "" : value,
    };

    // If changing category, reset subCategory
    if (key === "category") {
      newFilters.subCategory = "";
    }

    // Update filters
    dispatch(setFilters(newFilters));
    dispatch(fetchFilteredProducts());
  };

  // Nursery-themed categories
  const categories = ["Plant", "Seed", "Plant Care"];

  // For subcategories
  const subCategories = {
    Plant: ["Indoor", "Outdoor", "Hanging"],
    Seed: ["Flower Seeds", "Vegetable Seeds", "Herbs"],
    "Plant Care": ["Fertilizers", "Pots", "Tools", "Accessories"],
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-green-50 dark:bg-gray-800 p-6 transition-transform duration-300 ease-in-out overflow-y-auto z-50 ${className}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
            Filters
          </h3>
          <button onClick={onClose} className="text-gray-500">
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
            Price Range
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              className="w-1/2 p-2 rounded border border-green-200 dark:border-gray-600 dark:bg-gray-700"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              className="w-1/2 p-2 rounded border border-green-200 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                <input
                  type="radio"
                  checked={filters.category === category}
                  onChange={() => handleFilterChange("category", category)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Categories (only show if category is selected) */}
        {filters.category && subCategories[filters.category] && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
              Sub-Categories
            </h4>
            <div className="space-y-2">
              {subCategories[filters.category].map((subCategory) => (
                <label
                  key={subCategory}
                  className="flex items-center cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700 p-2 rounded"
                >
                  <input
                    type="radio"
                    checked={filters.subCategory === subCategory}
                    onChange={() =>
                      handleFilterChange("subCategory", subCategory)
                    }
                    className="rounded text-green-600 focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {subCategory}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Rating Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-green-700 dark:text-green-300 mb-3">
            Minimum Rating
          </h4>
          <select
            value={filters.minRating || ""}
            onChange={(e) => handleFilterChange("minRating", e.target.value)}
            className="w-full p-2 rounded border border-green-200 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        <button
          onClick={() => {
            dispatch(resetFilters());
            dispatch(fetchFilteredProducts());
          }}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Reset Filters
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default FilterSidebar;
