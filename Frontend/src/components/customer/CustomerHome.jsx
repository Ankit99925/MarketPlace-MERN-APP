import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerData } from "../../store/slices/customerSlice";
import ProductGrid from "../shared/ProductGrid";

const CustomerHome = () => {
  const dispatch = useDispatch();
  const { userType, isAuthenticated } = useSelector((state) => state.auth);
  const { cart, isLoading, filteredProducts } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isAuthenticated && userType === "Customer") {
      dispatch(fetchCustomerData());
    }
  }, [dispatch, isAuthenticated, userType]);

  return (
    <ProductGrid
      products={filteredProducts || []}
      isLoading={isLoading}
      cart={cart}
      emptyMessage="No products available"
    />
  );
};

export default CustomerHome;
