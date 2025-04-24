const Pagination = ({ metadata, onPageChange }) => {
  if (!metadata || metadata.totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center">
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(metadata.page - 1)}
          disabled={metadata.page === 1}
          className="px-4 py-2 border border-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 dark:hover:bg-gray-700"
        >
          Previous
        </button>
        {[...Array(metadata.totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => onPageChange(index + 1)}
            className={`px-4 py-2 border rounded-lg ${
              metadata.page === index + 1
                ? "bg-green-500 text-white"
                : "border-green-500 hover:bg-green-50 dark:hover:bg-gray-700"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(metadata.page + 1)}
          disabled={metadata.page === metadata.totalPages}
          className="px-4 py-2 border border-green-500 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-50 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
