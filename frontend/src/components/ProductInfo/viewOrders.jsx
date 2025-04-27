import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(`http://localhost:8020/Order/getOrders`);
      setOrders(res.data);
      console.log(res.data);
    };
    getOrders();
  }, []);

  const handleUpdateState = async (orderId, newState) => {
    try {
      const res = await axios.put(
        `http://localhost:8020/Order/updateOrder/${orderId}`,
        { status: newState }
      );
      const updatedOrder = res.data;

      setOrders((prevOrders) => {
        const newOrders = [...prevOrders];
        const index = newOrders.findIndex((order) => order._id === updatedOrder._id);
        newOrders[index] = updatedOrder;
        return newOrders;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Manage Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No orders available.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order, key) => (
              <div
                key={key}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  Order #{key + 1}
                </h3>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">User ID:</span> {order.userId}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Amount (Rs.):</span> {order.amount}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-semibold">Order Status:</span>{" "}
                  <span
                    className={`inline-block px-3 py-1 rounded-full font-medium ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "dispatched"
                        ? "bg-purple-100 text-purple-800"
                        : order.status === "delivered"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>

                <div className="overflow-x-auto">
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

                <div className="mt-4 flex flex-wrap gap-4">
                  <button
                    onClick={() => handleUpdateState(order._id, "pending")}
                    className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg hover:bg-yellow-200 transition"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => handleUpdateState(order._id, "confirmed")}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
                  >
                    Confirmed
                  </button>
                  <button
                    onClick={() => handleUpdateState(order._id, "dispatched")}
                    className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
                  >
                    Dispatched
                  </button>
                  <button
                    onClick={() => handleUpdateState(order._id, "delivered")}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;