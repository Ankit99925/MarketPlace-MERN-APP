import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  FilterSidebar,
  FilterButton,
  SortDropdown,
} from "./FilterComponents/FilterComponents";
import {
  setFilters,
  fetchFilteredProducts,
} from "../../store/slices/publicSlice";
import ProductGrid from "./ProductGrid";
import Pagination from "./Pagination";

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  const searchQuery = new URLSearchParams(location.search).get("q");
  const { filteredProducts, isLoading, error, metadata } = useSelector(
    (state) => state.public
  );

  useEffect(() => {
    console.log("SearchResults mounted, query:", searchQuery);
    console.log("Current filteredProducts:", filteredProducts);
    dispatch(fetchFilteredProducts());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery) {
      console.log("Search query changed:", searchQuery);
      dispatch(setFilters({ search: searchQuery }));
      dispatch(fetchFilteredProducts());
    }
  }, [searchQuery, dispatch]);

  console.log("Rendering SearchResults with:", {
    filteredProducts,
    isLoading,
    error,
    metadata,
  });

  const handlePageChange = (newPage) => {
    dispatch(setFilters({ page: newPage }));
    dispatch(fetchFilteredProducts());
    window.scrollTo(0, 0);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            Error loading products
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Search Header */}
      <div className="bg-green-100 dark:bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              {searchQuery
                ? `Search results for "${searchQuery}"`
                : "All Products"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredProducts?.length || 0} results found
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <FilterSidebar
            isOpen={isFilterSidebarOpen}
            onClose={() => setIsFilterSidebarOpen(false)}
          />

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
              </div>
            ) : (
              <ProductGrid
                products={filteredProducts || []}
                isLoading={isLoading}
                emptyMessage={
                  searchQuery
                    ? `No products found for "${searchQuery}"`
                    : "No products available"
                }
              />
            )}

            {metadata.totalPages > 1 && (
              <Pagination metadata={metadata} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
