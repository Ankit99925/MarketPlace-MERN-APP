import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/slices/customerSlice";
import { FaStar, FaTimes, FaShoppingCart, FaCheck } from "react-icons/fa";

const QuickViewProductCard = ({ product, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.customer.cart);
  const [quantity, setQuantity] = useState(1);
  const modalRef = useRef();

  const isInCart = cart.includes(product?._id);

  useEffect(() => {
    // Reset quantity when modal opens
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    dispatch(addProductToCart(product._id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product._id));
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-fadeIn border border-white/20 dark:border-gray-700/20"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors bg-white/50 dark:bg-gray-800/50 p-2 rounded-full backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-800/70"
          aria-label="Close"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto">
          <div className="flex flex-col h-full">
            <div className="flex-grow">
              {/* Tags and categories */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="bg-green-100/80 backdrop-blur-sm text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="bg-blue-100/80 backdrop-blur-sm text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  {product.subCategory}
                </span>
                {product.isFeatured && (
                  <span className="bg-yellow-100/80 backdrop-blur-sm text-yellow-800 text-xs font-medium px-2.5 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Product name and brand */}
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {product.productName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Brand: <span className="font-medium">{product.brand}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.floor(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 dark:text-gray-300">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-green-700 dark:text-green-400 mb-4">
                ${product.price.toFixed(2)}
              </p>

              {/* Stock */}
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Stock: <span className="font-medium">{product.stock}</span>{" "}
                units
              </p>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100/80 backdrop-blur-sm text-gray-800 dark:bg-gray-700/80 dark:text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Add to Cart Section */}
            {isAuthenticated && userType !== "Seller" && (
              <div className="pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <button
                      onClick={decreaseQuantity}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-l-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 1)
                      }
                      className="w-12 h-8 text-center border-y border-gray-200/50 dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-white backdrop-blur-sm focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={increaseQuantity}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-r-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">
                    Total:{" "}
                    <span className="font-bold">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </span>
                </div>

                <button
                  onClick={isInCart ? handleRemoveFromCart : handleAddToCart}
                  className={`w-full py-3 px-4 rounded-md font-medium transition-all duration-300 flex items-center justify-center ${
                    isInCart
                      ? "bg-red-100/80 text-red-700 hover:bg-red-100 backdrop-blur-sm"
                      : "bg-green-600/90 text-white hover:bg-green-600 backdrop-blur-sm"
                  }`}
                >
                  {isInCart ? (
                    <>
                      <FaCheck className="mr-2" /> Remove from Cart
                    </>
                  ) : (
                    <>
                      <FaShoppingCart className="mr-2" /> Add to Cart
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewProductCard;
