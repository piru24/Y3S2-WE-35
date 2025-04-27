import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

const KEY =
  "pk_test_51Q5kUrKs4ldJ96PWJsuoDCG9WwlLqb5rS6eBXsrdEGMMifKnRIrabnhta1MvPcabDAZEsuf3lK4V3I01d7eUcvWp00o91jsc6s";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const [deliveryType, setDeliveryType] = useState();
  const [address, setAddress] = useState("");
  const [cheapDelivery, setCheapDelivery] = useState();
  const [fastDelivery, setFastDelivery] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [finalTotal, setFinalTotal] = useState();
  const [cheapDeliveryTime, setCheapDeliveryTime] = useState();
  const [fastDeliveryTime, setFastDeliveryTime] = useState();
  const [visibility, setVisibility] = useState(false);

  const getDeliveryPrices = async () => {
    const randomWeight = Math.random() * 4.9 + 1.0;

    const deliveryData = {
      shipfrom: "Colombo",
      shipto: address,
      weight: randomWeight,
    };

    const deliveryResult = await axios.post(
      "http://localhost:8300/delivery/rate",
      deliveryData
    );
    setVisibility(true);

    setCheapDelivery(deliveryResult.data.cheapDelivery.rate / 10);
    setFastDelivery(deliveryResult.data.fastDelivery.rate / 10);
    setCheapDeliveryTime(deliveryResult.data.cheapDelivery.duration);
    setFastDeliveryTime(deliveryResult.data.fastDelivery.duration);
  };

  const handleOptionChange = (event) => {
    setDeliveryType(event.target.value);
    setDeliveryCharge(
      event.target.value === "fast" ? fastDelivery : cheapDelivery
    );
    setFinalTotal(cart.withCommision + deliveryCharge);
  };

  const navigate = useNavigate();

  useEffect(() => {
    setFinalTotal(cart.withCommision);
  }, [cheapDelivery, fastDelivery, address, deliveryCharge]);

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:8020/Order/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });

        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    stripeToken && makeRequest();
  }, [stripeToken, cart.total]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      products: cart.products.map((product) => ({
        productId: product._id,
        name: product.name,
        quantity: product.quantity,
      })),
      amount: cart.withCommision,
      status: "pending",
    };

    try {
      const res = await axios.post(
        "http://localhost:8020/Order/addOrder",
        orderData
      );
      console.log(orderData);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Shopping Cart
        </h1>

        {/* Cart Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
          <table className="min-w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cart.products.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {product.quantity} x {product.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Delivery Options */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Delivery Options
          </h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              type="button"
              onClick={getDeliveryPrices}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Get Prices
            </button>
          </div>

          {visibility && (
            <div className="mt-4">
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  id="fastDelivery"
                  name="delivery"
                  value="fast"
                  checked={deliveryType === "fast"}
                  onChange={handleOptionChange}
                  className="focus:ring-blue-500"
                />
                <label htmlFor="fastDelivery" className="text-gray-700">
                  Fast Delivery: Rs.{fastDelivery}, {fastDeliveryTime} hrs
                </label>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <input
                  type="radio"
                  id="cheapDelivery"
                  name="delivery"
                  value="cheap"
                  checked={deliveryType === "cheap"}
                  onChange={handleOptionChange}
                  className="focus:ring-blue-500"
                />
                <label htmlFor="cheapDelivery" className="text-gray-700">
                  Cheap Delivery: Rs.{cheapDelivery}, {cheapDeliveryTime} days
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="flex justify-between text-gray-700">
            <span>Cart Total:</span>
            <span>Rs. {cart.total}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>With Commission:</span>
            <span>Rs. {cart.withCommision}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Delivery Charges:</span>
            <span>Rs. {deliveryCharge || 0}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-800">
            <span>Total:</span>
            <span>Rs. {finalTotal || cart.withCommision}</span>
          </div>
        </div>

        {/* Checkout Buttons */}
        <div className="mt-8 flex gap-4">
          <StripeCheckout
            name="Engada Kada Shop"
            description={`Your total is Rs. ${cart.total}`}
            amount={cart.total * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
              Checkout with Stripe
            </button>
          </StripeCheckout>
          <button
            onClick={() => navigate("/dummyPayment")}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Checkout with Dummy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;