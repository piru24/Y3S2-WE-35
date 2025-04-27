import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { addProduct } from "../Store";
import { useDispatch } from "react-redux";

const Productinfo = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/products/getProduct/${id}`
        );
        setProduct(response.data.product);
        console.log(response.data.product);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleAddtoCart = () => {
    dispatch(addProduct({ ...product, quantity }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="flex-grow">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Price:</span> Rs. {product.price}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-semibold">Weight:</span> {product.weight}g
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Seller:</span> {product.sellerName}
            </p>

            {/* Rate Seller Button */}
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mb-4"
              onClick={() =>
                navigate(`/rateSeller/${product.sellerName}/${product.sellerId}`)
              }
            >
              Rate This Seller
            </button>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => handleQuantity("dec")}
              >
                -
              </button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                onClick={() => handleQuantity("inc")}
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition"
              onClick={handleAddtoCart}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productinfo;