const Order = ({ order, products }) => {
  console.log("Order", order);
  const productsInOrder = order.products.map((productId) => {
    return products.find((product) => product._id === productId);
  });

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white flex flex-col gap-4">
      <p className="text-gray-700 font-bold">
        Total Amount: ${order.totalAmount}
      </p>
      <p className="text-gray-500">
        Order Date: {new Date(order.orderDate).toLocaleString()}
      </p>
      <div className="grid grid-cols-1 gap-4">
        {productsInOrder.map((product) => (
          <div
            key={product._id}
            className="flex items-center border border-gray-200 rounded-lg shadow-sm p-2 bg-gray-50"
          >
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.productName}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex flex-col">
              <h3 className="text-sm font-medium">{product.productName}</h3>
              <p className="text-gray-700 text-sm">Price: ${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
