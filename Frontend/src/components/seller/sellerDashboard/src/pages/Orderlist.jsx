import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import FilterButton from "../components/DropdownFilter";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchSellerOrders,
  updateOrderDeliveryStatus,
} from "../../../../../store/slices/sellerSlice";
import { useRef } from "react";
import { toast } from "react-toastify";

function OrderList() {
  const { orders, updatingOrderId, isLoading } = useSelector(
    (state) => state.seller
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const statusRef = useRef(null);

  useEffect(() => {
    dispatch(fetchSellerOrders()).unwrap();
  }, [dispatch]);

  const handleUpdateStatus = async (orderId, status) => {
    try {
      await dispatch(updateOrderDeliveryStatus({ orderId, status })).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Failed to update status");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                  Order List
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton align="right" />

                {/* Add Product button */}
                <Link
                  to="/addProduct"
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                >
                  <svg
                    className="fill-current shrink-0 xs:hidden"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add Product</span>
                </Link>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 gap-4">
              {isLoading && orders.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : orders && orders.length > 0 ? (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden min-h-[400px]">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th
                          scope="col"
                          className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Customer
                        </th>
                        <th
                          scope="col"
                          className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="w-24 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Total
                        </th>
                        <th
                          scope="col"
                          className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="w-48 px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {orders.map((order) => (
                        <tr
                          key={order._id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            #{order._id.substring(0, 8)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {order.customer
                              ? order.customer.firstName +
                                " " +
                                order.customer.lastName
                              : "Unknown"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            ${order.total}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "shipped"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "cancelled"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex flex-col md:flex-row items-center justify-end gap-2 min-w-[200px]">
                              <div className="relative w-full md:w-40">
                                <select
                                  name="orderStatus"
                                  id={`status-${order._id}`}
                                  className="appearance-none w-full md:w-40 px-4 py-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all duration-200"
                                  defaultValue={order.status}
                                  disabled={updatingOrderId === order._id}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(
                                    order._id,
                                    document.getElementById(
                                      `status-${order._id}`
                                    ).value
                                  )
                                }
                                disabled={updatingOrderId === order._id}
                                className="w-full md:w-24 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                              >
                                {updatingOrderId === order._id ? (
                                  <span className="flex items-center gap-2">
                                    <svg
                                      className="animate-spin h-4 w-4"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    Updating...
                                  </span>
                                ) : (
                                  "Update"
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  document
                                    .getElementById(
                                      `order-details-${order._id}`
                                    )
                                    .classList.remove("hidden");
                                }}
                                className="w-full md:w-24 px-3 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-md text-sm font-medium transition-colors duration-200 shadow-sm"
                              >
                                View Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No orders found
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default OrderList;
