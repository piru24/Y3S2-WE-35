import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8070/products/getProducts", { withCredentials: true });
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const searchProduct = async (e) => {
    e.preventDefault();
    const searchValue = e.target.value;
    try {
      const { data } = await axios.get(
        `http://localhost:8070/products/search/?search=${searchValue}`
      );
      setProducts(data.data.products);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Our Products</h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <input
            type="search"
            placeholder="Search for products..."
            onChange={searchProduct}
            className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, key) => (
            <div
              key={key}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">
                  Restaurant: {product.sellerName} <br />
                  <span
                    className={`font-semibold ${
                      product.sellerAvailable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.sellerAvailable ? "Available" : "Not Available"}
                  </span>
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => navigate(`/getProduct/${product._id}`)}
                  >
                    Info
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
                    onClick={() => navigate(`/rateBuyer/${product._id}`)}
                  >
                    ⭐⭐⭐
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;