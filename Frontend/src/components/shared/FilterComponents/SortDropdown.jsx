import { useDispatch, useSelector } from "react-redux";
import {
  setFilters,
  fetchFilteredProducts,
} from "../../../store/slices/publicSlice";

const SortDropdown = ({ className = "" }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.public);

  const sortOptions = [
    { value: "productName:asc", label: "Name: A to Z" },
    { value: "productName:desc", label: "Name: Z to A" },
    { value: "price:asc", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "createdAt:desc", label: "Newest First" },
    { value: "createdAt:asc", label: "Oldest First" },
  ];

  return (
    <select
      value={`${filters.sortBy}:${filters.sortOrder}`}
      onChange={(e) => {
        const [sortBy, sortOrder] = e.target.value.split(":");
        dispatch(setFilters({ sortBy, sortOrder }));
        dispatch(fetchFilteredProducts());
      }}
      className={`px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-green-50 dark:hover:bg-gray-600 ${className}`}
    >
      {sortOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SortDropdown;
