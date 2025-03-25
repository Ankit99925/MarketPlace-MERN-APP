import CartProductCard from "./CartProductCard";

const CartItem = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-green-700 font-medium">
        No products found. Start adding your products!
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <CartProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CartItem;
