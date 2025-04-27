import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert2";
import axios from "axios";

export default function AddPayment() {
  const cart = useSelector((state) => state.cart);
  const [payments, setPayments] = useState({
    email: "",
    mobile: "",
    number: "",
    expiration: "",
    cvv: "",
    name: "",
    amount: "",
  });

  const handleChangeText = (name, value) => {
    setPayments({ ...payments, [name]: value.target.value });
  };

  const newPayment = {
    email: payments.email,
    mobile: payments.mobile,
    card: {
      number: payments.number,
      expiration: payments.expiration,
      cvv: payments.cvv,
      name: payments.name,
    },
    amount: payments.amount,
  };

  const AddPayment = async (e) => {
    e.preventDefault();
    try {
      // 1. Make dummy payment
      const paymentRes = await axios.post(
        "http://localhost:8500/payment/card",
        newPayment,
        { withCredentials: true }
      );
      swal.fire(`Payment Successful`);

      // 2. Now create the order (just like Stripe flow)
      const orderData = {
        products: cart.products.map((product) => ({
          productId: product._id,
          name: product.name,
          quantity: product.quantity,
        })),
        amount: cart.withCommision,
        status: "pending",
      };
      const orderRes = await axios.post(
        "http://localhost:8020/Order/addOrder",
        orderData,
        { withCredentials: true }
      );

      // 3. Navigate to order history or show success
      navigate("/getOrders");
    } catch (error) {
      console.error(error);
      swal.fire(`Payment or Order Failed`);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Payment
        </h1>
        <form onSubmit={AddPayment} className="space-y-6">
          {/* Email and Mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={(val) => handleChangeText("email", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile
              </label>
              <input
                name="mobile"
                type="number"
                placeholder="Mobile"
                required
                onChange={(val) => handleChangeText("mobile", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Credit Card Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="number"
                className="block text-gray-700 font-medium mb-2"
              >
                Credit Card Number
              </label>
              <input
                name="number"
                type="text"
                placeholder="xxxx xxxx xxxx xxxx"
                required
                onChange={(val) => handleChangeText("number", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="expiration"
                className="block text-gray-700 font-medium mb-2"
              >
                Expiration Date
              </label>
              <input
                name="expiration"
                type="text"
                placeholder="MM/YY"
                required
                onChange={(val) => handleChangeText("expiration", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cvv"
                className="block text-gray-700 font-medium mb-2"
              >
                CVV
              </label>
              <input
                name="cvv"
                type="number"
                placeholder="CVV"
                required
                onChange={(val) => handleChangeText("cvv", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name on Card
              </label>
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                onChange={(val) => handleChangeText("name", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Amount (Rs.)
            </label>
            <input
              name="amount"
              type="number"
              placeholder="Amount"
              required
              onChange={(val) => handleChangeText("amount", val)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
}