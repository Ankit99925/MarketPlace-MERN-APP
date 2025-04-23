import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import { useSelector } from "react-redux";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { products, orders } = useSelector((state) => state.seller);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard header */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Seller Dashboard
                </h1>
              </div>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Products */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Products
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {products?.length || 0}
                </p>
              </div>

              {/* Total Orders */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Orders
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {orders?.length || 0}
                </p>
              </div>

              {/* Revenue */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Total Revenue
                </h3>
                <p className="text-3xl font-bold text-green-600">
                  $
                  {orders
                    ?.reduce((acc, order) => acc + order.totalAmount, 0)
                    .toFixed(2) || "0.00"}
                </p>
              </div>

              {/* Active Products */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                  Active Products
                </h3>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  {products?.filter((product) => product.stock > 0).length || 0}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-8">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  Recent Orders
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 dark:text-gray-400">
                        <th className="pb-4">Order ID</th>
                        <th className="pb-4">Product</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4">Amount</th>
                        <th className="pb-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.slice(0, 5).map((order) => (
                        <tr
                          key={order._id}
                          className="border-t border-gray-200 dark:border-gray-700"
                        >
                          <td className="py-4">{order._id}</td>
                          <td className="py-4">
                            {order.items[0]?.productName}
                          </td>
                          <td className="py-4">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4">${order.totalAmount}</td>
                          <td className="py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Processing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
