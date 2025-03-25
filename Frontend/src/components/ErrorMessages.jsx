const ErrorMessages = ({ errorMessages }) => {
  if (!errorMessages || errorMessages.length === 0) return null;
  return (
    <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
      <h3 className="text-red-700 font-semibold text-sm mb-2">
        Error loading products:
      </h3>
      <p className="text-red-600 text-sm">{errorMessages}</p>
    </div>
  );
};

export default ErrorMessages;
