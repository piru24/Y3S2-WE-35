import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import { FaRupeeSign, FaCheckCircle, FaClock } from "react-icons/fa";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8020/Order/orderhistory",
          { withCredentials: true }
        );
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.orders || [];
        setOrders(data);
      } catch (err) {
        setOrders([]);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 via-yellow-100 to-green-300 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-10 tracking-tight drop-shadow flex items-center justify-center gap-2">
          <MdFastfood className="text-yellow-500" /> Order History
        </h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src="/images/empty-cart.png"
              alt="No orders"
              className="w-40 h-40 opacity-40 mb-6"
            />
            <p className="text-center text-gray-600 text-xl font-semibold">
              No orders found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {orders.map((order, key) => (
              <div
                key={key}
                className="bg-white/90 shadow-2xl rounded-3xl p-8 border border-green-100 hover:shadow-green-200 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-green-800 flex items-center gap-2">
                    <MdFastfood className="text-yellow-400" />
                    Order #{key + 1}
                  </h4>
                  <span className={`flex items-center gap-2 text-sm font-bold px-4 py-1 rounded-full shadow
                    ${order.status === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-800"}
                  `}>
                    {order.status === "completed" ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaClock className="text-yellow-500" />
                    )}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <span className="flex items-center text-lg font-bold text-green-700 bg-green-50 px-4 py-2 rounded-full shadow">
                    <FaRupeeSign className="mr-1" />
                    {order.amount}
                  </span>
                  <span className="text-sm text-gray-500">
                    {order.products.length} item{order.products.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div>
                  <h5 className="text-md font-semibold text-green-800 mb-2">
                    Products:
                  </h5>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-green-50 rounded-xl overflow-hidden shadow">
                      <thead className="bg-green-100">
                        <tr>
                          <th className="px-4 py-2 text-left text-sm font-bold text-green-800 uppercase">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-bold text-green-800 uppercase">
                            Quantity
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-green-100">
                        {order.products.map((product, pkey) => (
                          <tr key={pkey}>
                            <td className="px-4 py-2 text-md text-green-900 font-semibold">
                              {product.name}
                            </td>
                            <td className="px-4 py-2 text-md text-green-900">
                              {product.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
