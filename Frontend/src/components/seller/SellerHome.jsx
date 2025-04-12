import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchSellerProducts,
} from "../../store/slices/sellerSlice";
import ProductCard from "../shared/ProductCard";
import PlantLoader from "../shared/PlantLoader";
const SellerHome = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);
  const { products, isLoading, errorMessages } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isAuthenticated && userType === "Seller") {
      dispatch(fetchSellerProducts());
    }
  }, [dispatch, isAuthenticated, userType]);

  const handleDeleteProduct = async (productid) => {
    dispatch(deleteProduct(productid));
  };
  const handleEditProduct = async (productid) => {
    dispatch(editProduct(productid));
  };
  if (isLoading) {
    return <PlantLoader />;
  }

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
              editProduct={handleEditProduct}
            />
          ))}
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
