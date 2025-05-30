import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/slices/customerSlice";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa"; // Import icons
import QuickViewProductCard from "./QuickViewProductCard";
import { modalService, modalConfigs } from "../../utils/modalService";
import { toast } from "react-toastify";

const ProductCard = ({ product, isAuthenticated }) => {
  const { userType } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart);

  const isInCart = cart.includes(product._id); // Use cart prop to check if product is in cart
  const [showQuickView, setShowQuickView] = useState(false);

  const handleAddToCart = async (productId) => {
    try {
      await dispatch(addProductToCart(productId)).unwrap();
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add product to cart");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await dispatch(removeProductFromCart(productId)).unwrap();
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Failed to remove from cart:", error);
      toast.error("Failed to remove product from cart");
    }
  };

  const handleDeleteProduct = async (productId) => {
    modalService(modalConfigs.delete(productId));
  };

  return (
    <>
      <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.productName}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
              {product.category || product.tag}
            </span>
          </div>
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setShowQuickView(true)}
              className="bg-white/80 backdrop-blur-sm text-green-800 hover:bg-white/90 px-4 py-2 rounded-md font-medium mx-1 flex items-center transition-all duration-300"
            >
              <FaEye className="mr-2" /> Quick View
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800">
            {product.productName}
          </h3>
          <div className="flex justify-between items-center mt-2">
            <p className="text-green-700 font-medium">${product.price}</p>
            {isAuthenticated && userType !== "Seller" && (
              <button
                onClick={
                  isInCart
                    ? () => handleRemoveFromCart(product._id)
                    : () => handleAddToCart(product._id)
                }
                className={`relative overflow-hidden px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out ${
                  isInCart
                    ? "bg-red-100/80 hover:bg-red-100 text-red-700"
                    : "bg-green-100/80 hover:bg-green-100 text-green-700"
                } transform hover:scale-105 hover:shadow-md backdrop-blur-sm`}
              >
                <span className="relative z-10">
                  {isInCart ? "Remove from cart" : "Add to cart"}
                </span>
                <span
                  className={`absolute inset-0 ${
                    isInCart ? "bg-red-50/50" : "bg-green-50/50"
                  } transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100`}
                ></span>
              </button>
            )}
            {isAuthenticated && userType === "Seller" && (
              <div className="flex space-x-2">
                <Link
                  to={`/editProduct/${product._id}`}
                  className="relative overflow-hidden px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out bg-blue-100/80 hover:bg-blue-100 text-blue-700 transform hover:scale-105 hover:shadow-md flex items-center backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <FaEdit className="mr-1" /> Edit
                  </span>
                  <span className="absolute inset-0 bg-blue-50/50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="relative overflow-hidden px-4 py-2 rounded-md font-medium transition-all duration-300 ease-in-out bg-red-100/80 hover:bg-red-100 text-red-700 transform hover:scale-105 hover:shadow-md flex items-center backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <FaTrash className="mr-1" /> Delete
                  </span>
                  <span className="absolute inset-0 bg-red-50/50 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewProductCard
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
