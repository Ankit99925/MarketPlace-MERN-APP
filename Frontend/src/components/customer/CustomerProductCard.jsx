import { useDispatch } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../../store/slices/customerSlice";

const CustomerProductCard = ({ product, cart, isPublic = false }) => {
  const dispatch = useDispatch();

  const isInCart = cart.includes(product._id); // Use cart prop to check if product is in cart
  const handleAddToCart = async (productId) => {
    dispatch(addProductToCart(productId));
  };
  const handleRemoveFromCart = async (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg shadow-md p-4">
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-bold text-green-800 mb-2">
        {product.productName}
      </h3>
      <span className="inline-block bg-green-200 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-2">
        {product.category}
      </span>
      <p className="text-green-700 text-sm mb-2">{product.description}</p>
      <p className="text-green-900 font-semibold mb-2">
        Price: ${product.price}
      </p>
      <div className="text-green-900 font-semibold mb-2 flex items-center">
        Rating:{" "}
        <span className="ml-2 text-yellow-500">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index}>
              {index < Math.floor(product.rating) ? "★" : "☆"}
            </span>
          ))}
        </span>
      </div>
      <p className="text-green-600 text-sm mb-4">
        Stock:{" "}
        {product.stock > 0 ? `${product.stock} available` : "Out of stock"}
      </p>
      {!isPublic && (
        <div className="flex justify-center">
          {isInCart ? (
            <button
              onClick={() => handleRemoveFromCart(product._id)}
              className="px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 shadow-md bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={() => handleAddToCart(product._id)}
              className="px-4 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 shadow-md bg-green-500 text-white hover:bg-green-600 focus:ring-green-400"
            >
              Add To Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerProductCard;
