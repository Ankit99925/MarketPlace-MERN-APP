import { useDispatch } from "react-redux";
import { removeProductFromCart } from "../../../store/slices/customerSlice";

const CartProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = async (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  return (
    <div className="flex items-center border border-green-300 rounded-xl shadow-lg p-6 bg-green-50 dark:bg-gray-800 dark:text-white">
      <img
        src={product.imageUrl || "/placeholder.png"}
        alt={product.productName}
        className="w-20 h-20 object-cover rounded-xl border border-green-200"
      />
      <div className="ml-6 flex-1">
        <h3 className="text-xl font-bold text-green-700 dark:text-white">
          {product.productName}
        </h3>
        <p className="text-green-800 dark:text-gray-300 font-medium">
          Category: {product.category}
        </p>
        <p className="text-green-900 dark:text-gray-300 font-semibold">
          Price: ${product.price}
        </p>
      </div>
      <button
        onClick={() => handleRemoveFromCart(product._id)}
        className="px-5 py-2 text-sm font-medium rounded-full focus:outline-none focus:ring-2 shadow-md bg-red-400 text-white hover:bg-red-500 focus:ring-red-300"
      >
        Remove
      </button>
    </div>
  );
};

export default CartProductCard;
