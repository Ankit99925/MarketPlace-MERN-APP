import { useNavigate } from "react-router-dom";
const CustomerProductCard = ({ product, delProduct }) => {
  const navigate = useNavigate();
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
      <div className="flex space-x-4">
        <button
          onClick={() => navigate(`/editproduct/${product._id}`)}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Edit
        </button>
        <button
          onClick={() => delProduct(product._id)}
          className="w-full bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerProductCard;
