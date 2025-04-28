import { useSelector } from "react-redux";

const Order = ({ order, products }) => {
  if (!order || !order.items || !products) {
    return <div>Loading order details...</div>;
  }

  // Find products for each order item
  const productsInOrder = order.items
    .map((item) => products.find((p) => p._id === item.product))
    .filter(Boolean); // Remove any undefined products


  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 dark:text-white flex flex-col gap-4">
      {/* Order ID */}
      <div className="text-sm text-gray-500 dark:text-white">Order ID: {order._id}</div>

      {/* Order Details */}
      <div className="flex justify-between items-center">
        <p className="text-gray-700 dark:text-white font-bold">
          Total Amount: ${order.total?.toFixed(2)}
        </p>
        <span
          className={`px-2 py-1 rounded ${
            order.status === "pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "processing"
              ? "bg-blue-100 text-blue-800"
              : order.status === "shipped"
              ? "bg-green-100 text-green-800"
              : order.status === "delivered"
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {order.status || "Processing"}
        </span>
      </div>

      {/* Order Date */}
      <p className="text-sm text-gray-500 dark:text-white">
        Order Date: {new Date(order.createdAt).toLocaleDateString()}
      </p>

      {/* Shipping Address if available */}
      {order.shippingAddress && (
        <div className="text-sm text-gray-600 dark:text-white border-t pt-2">
          <p className="font-medium">Shipping Address:</p>
          <p>{order.shippingAddress.street}</p>
          <p>
            {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
            {order.shippingAddress.zip}
          </p>
        </div>
      )}

      {/* Seller Details */}
      {order.sellerDetails && (
        <div className="text-sm text-gray-600 dark:text-white border-t pt-2">
          <p className="font-medium">Seller Information:</p>
          <p>Seller: {order.sellerDetails.name}</p>
          <p>Contact: {order.sellerDetails.email}</p>
        </div>
      )}

      {/* Products List */}
      <div className="grid grid-cols-1 gap-4 mt-2">
        <h3 className="font-medium">Order Items:</h3>
        {productsInOrder.length > 0 ? (
          productsInOrder.map((product) => (
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
                <p className="text-gray-700 text-sm">
                  Price: ${product.price?.toFixed(2)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            No products found in this order
          </p>
        )}
      </div>

      {/* Payment Status */}
      <p
        className={`text-sm ${
          order.paymentDetails === "paid" ? "text-green-600" : "text-yellow-600"
        }`}
      >
        Payment Status: {order.paymentDetails || "Pending"}
      </p>
    </div>
  );
};

export default Order;
