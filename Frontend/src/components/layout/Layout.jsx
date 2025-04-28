import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FilterSidebar,
  FilterButton,
  SortDropdown,
} from "../shared/FilterComponents/FilterComponents";
import {
  setFilters,
  fetchFilteredProducts,
} from "../../store/slices/publicSlice";
import Pagination from "../shared/Pagination";

const FilterableLayout = () => {
  const dispatch = useDispatch();
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const { filteredProducts, isLoading, error, metadata } = useSelector(
    (state) => state.public
  );

  const handlePageChange = (newPage) => {
    dispatch(setFilters({ page: newPage }));
    dispatch(fetchFilteredProducts());
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Filter Header */}
      <div className="bg-green-100 dark:bg-gray-800 p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex justify-end mr-12 items-center gap-8">
            <FilterButton onClick={() => setIsFilterSidebarOpen(true)} />
            <SortDropdown />
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
            {error ? (
              <div className="text-center text-red-600">{error}</div>
            ) : (
              <>
                <Outlet /> {/* This renders the child route components */}
                {metadata?.totalPages > 1 && (
                  <Pagination
                    metadata={metadata}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterableLayout;
