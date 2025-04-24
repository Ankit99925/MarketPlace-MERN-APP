import React from "react";
import {
  FaExclamationTriangle,
  FaTrash,
  FaTimes,
  FaCheck,
  FaPencilAlt,
  FaSpinner,
} from "react-icons/fa";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  type,
  isLoading,
}) => {
  if (!isOpen) return null;

  // Determine icon and styles based on type
  let icon = <FaExclamationTriangle className="text-yellow-500" size={24} />;
  let confirmButtonClass = "bg-blue-600 hover:bg-blue-700 text-white";
  let confirmIcon = null;
  let bgColorClass = "bg-blue-100";

  if (type === "delete") {
    icon = <FaTrash className="text-red-500" size={24} />;
    confirmButtonClass = "bg-red-600 hover:bg-red-700 text-white";
    confirmIcon = <FaTrash className="mr-2" />;
    bgColorClass = "bg-red-100";
  } else if (type === "edit") {
    icon = <FaPencilAlt className="text-green-500" size={24} />;
    confirmButtonClass = "bg-green-600 hover:bg-green-700 text-white";
    confirmIcon = <FaCheck className="mr-2" />;
    bgColorClass = "bg-green-100";
  }

  // Dynamic loading text with ellipsis animation
  const getLoadingText = () => {
    if (!isLoading) return confirmButtonText;

    const baseText =
      type === "edit"
        ? "Saving"
        : type === "delete"
        ? "Deleting"
        : "Processing";
    return baseText;
  };

  return (
    <div className="fixed inset-0">
      {/* Very translucent overlay */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.15)" }}
        aria-hidden="true"
        onClick={!isLoading ? onClose : undefined}
      ></div>

      {/* The rest of the modal */}
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full relative z-50">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`bg-white rounded-md ${
                isLoading
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-400 hover:text-gray-500 cursor-pointer"
              } focus:outline-none`}
            >
              <span className="sr-only">Close</span>
              <FaTimes size={20} />
            </button>
          </div>

          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div
                className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${bgColorClass} sm:mx-0 sm:h-10 sm:w-10 ${
                  isLoading ? "animate-pulse" : ""
                }`}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin text-gray-500" size={24} />
                ) : (
                  icon
                )}
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center">
                      {getLoadingText()}
                      <span className="ml-1 inline-flex">
                        <span className="animate-[bounce_1s_infinite_0.0s] h-1 w-1 bg-gray-500 rounded-full inline-block"></span>
                        <span className="animate-[bounce_1s_infinite_0.2s] ml-0.5 h-1 w-1 bg-gray-500 rounded-full inline-block"></span>
                        <span className="animate-[bounce_1s_infinite_0.4s] ml-0.5 h-1 w-1 bg-gray-500 rounded-full inline-block"></span>
                      </span>
                    </span>
                  ) : (
                    title
                  )}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {isLoading
                      ? "Please wait while we process your request..."
                      : message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className={`w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium 
                ${confirmButtonClass} 
                ${
                  isLoading
                    ? "opacity-75 cursor-not-allowed"
                    : "hover:scale-105 active:scale-95"
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 
                ${
                  type === "edit"
                    ? "focus:ring-green-500"
                    : type === "delete"
                    ? "focus:ring-red-500"
                    : "focus:ring-blue-500"
                } 
                sm:ml-3 sm:w-auto sm:text-sm
                transition-all duration-300 transform`}
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  <span className="inline-flex items-center">
                    {getLoadingText()}
                    <span className="ml-1 inline-flex">
                      <span className="animate-[bounce_1s_infinite_0.0s] h-1 w-1 bg-white rounded-full inline-block"></span>
                      <span className="animate-[bounce_1s_infinite_0.2s] ml-0.5 h-1 w-1 bg-white rounded-full inline-block"></span>
                      <span className="animate-[bounce_1s_infinite_0.4s] ml-0.5 h-1 w-1 bg-white rounded-full inline-block"></span>
                    </span>
                  </span>
                </>
              ) : (
                <>
                  {confirmIcon}
                  {confirmButtonText}
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium
                ${
                  isLoading
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-50 hover:scale-105 active:scale-95"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm
                transition-all duration-300 transform`}
            >
              {cancelButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
