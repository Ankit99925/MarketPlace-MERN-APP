import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchSellerProducts,
} from "../../store/slices/sellerSlice";
import axios from "axios";
import ProductCard from "./ProductCard";

const SellerHome = () => {
  const dispatch = useDispatch();

  const { products, isLoading, errorMessages } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDeleteProduct = async (productid) => {
    const token = localStorage.getItem("jwtToken");
    const response = await axios.delete(
      `http://localhost:3000/api/seller/deleteProduct/${productid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    dispatch(deleteProduct(productid));
  };

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Your Products
      </h1>

      {isLoading && (
        <div className="flex justify-center items-center">
          <div className="text-green-700 font-semibold text-lg">
            Loading your products...
          </div>
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              delProduct={handleDeleteProduct}
            />
          ))}
        </div>
      )}
      {!isLoading && errorMessages && errorMessages.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md shadow-sm">
          <h3 className="text-red-700 font-semibold text-sm mb-2">
            Error loading products:
          </h3>
          <p className="text-red-600 text-sm">{errorMessages}</p>
        </div>
      )}

      {!isLoading && products.length === 0 && !errorMessages && (
        <div className="text-center text-green-700 font-medium">
          No products found. Start adding your products!
        </div>
      )}
    </div>
  );
};

export default SellerHome;
