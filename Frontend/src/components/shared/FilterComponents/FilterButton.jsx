const FilterButton = ({ onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:bg-green-50 dark:hover:bg-gray-600 ${className}`}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      Filters
    </button>
  );
};

export default FilterButton;
