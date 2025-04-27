import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8020/Order/orderhistory",
          { withCredentials: true }
        );
        // Handle both {orders: [...]} and [...] response
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(data);
        console.log("Order history response:", data);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setOrders([]);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Order History
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, key) => (
              <div
                key={key}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h4 className="text-lg font-bold text-gray-800 mb-4">
                  Order #{key + 1}
                </h4>
                <p className="text-gray-700">
                  <span className="font-semibold">Amount:</span> Rs.
                  {order.amount}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Order Status:</span>{" "}
                  {order.status}
                </p>

                <div className="mt-4">
                  <h5 className="text-md font-semibold text-gray-800 mb-2">
                    Products:
                  </h5>
                  <table className="min-w-full bg-gray-50 rounded-lg overflow-hidden">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {order.products.map((product, pkey) => (
                        <tr key={pkey}>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {product.name}
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-800">
                            {product.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;