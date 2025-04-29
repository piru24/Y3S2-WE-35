import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiInfo, FiStar, FiHeart } from "react-icons/fi";
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const staticProducts = [
  {
    _id: 1,
    name: "Margherita Pizza",
    category: "pizza",
    price: 12.99,
    image: "/images/pizza.jpeg",
    sellerName: "Pizza Palace",
    sellerAvailable: true,
    desc: "Classic tomato and mozzarella",
    avgRating: 4.5
  },
  {
    _id: 2,
    name: "Cheese Burger",
    category: "burger",
    price: 9.99,
    image: "/images/burger.jpg",
    sellerName: "Burger Barn",
    sellerAvailable: true,
    desc: "Juicy beef patty with cheese",
    avgRating: 4.3
  },
  {
    _id: 3,
    name: "Chapathi Thosa",
    category: "thosa",
    price: 9.99,
    image: "/images/thosa.jpg",
    sellerName: "Thosa Kada",
    sellerAvailable: true,
    desc: "Soft chapathi style thosa served hot",
    avgRating: 4.3
  },
  {
    _id: 4,
    name: "Chicken Biryani",
    category: "biryani",
    price: 14.99,
    image: "/images/biryani.jpeg",
    sellerName: "Biryani House",
    sellerAvailable: true,
    desc: "Spicy aromatic chicken biryani",
    avgRating: 4.7
  }
];

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        if (isLoggedIn) {
          const res = await axios.get("http://localhost:8070/products/getProducts", {
            withCredentials: true
          });
          setProducts([...staticProducts, ...res.data]);
        } else {
          setProducts(staticProducts);
        }
      } catch (err) {
        console.log(err);
        setProducts(staticProducts);
      }
    };
    getProducts();
  }, [isLoggedIn]);

  // Local filtering of products by name
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update searchQuery state on input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-400 to-green-700">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center text-green-400 mb-10 tracking-tight drop-shadow">
          Explore Our Menu
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-lg items-center">
            <input
              type="search"
              placeholder="Search for dishes or restaurants..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-lg"
            />
            <FiSearch className="absolute left-4 top-3 text-green-400 text-2xl mt-1"/>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {filteredProducts.map((product, key) => (
            <div
              key={key}
              className="relative group bg-white shadow-2xl rounded-3xl overflow-hidden border border-green-100 hover:shadow-green-300 transition-all duration-300"
            >
              {/* Favorite & Promo badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <span className="bg-yellow-400 text-green-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.category}
                </span>
                <button className="bg-white/80 rounded-full p-2 shadow hover:bg-red-100 transition">
                  <FiHeart className="text-red-400" />
                </button>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-green-900 truncate">{product.name}</h2>
                  <span className="ml-2 text-yellow-400 flex items-center font-bold">
                    <FiStar className="mr-1" /> {product.avgRating ? product.avgRating.toFixed(1) : "4.5"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  <span className="font-semibold text-green-700">Restaurant:</span> {product.sellerName}
                  <br />
                  <span
                    className={`font-semibold ${
                      product.sellerAvailable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.sellerAvailable ? "Available" : "Not Available"}
                  </span>
                </p>
                <div className="flex-1"></div>
                <div className="flex justify-between items-center mt-2">
                  <button
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-full font-semibold shadow hover:bg-green-700 transition"
                    onClick={() => navigate(`/getProduct/${product._id}`)}
                  >
                    <FiInfo className="mr-2" /> Info
                  </button>
                  <button
                    className="flex items-center bg-yellow-400 text-green-900 px-4 py-2 rounded-full font-bold shadow hover:bg-yellow-500 transition"
                    onClick={() => navigate(`/rateBuyer/${product._id}`)}
                  >
                    <FiStar className="mr-2" /> Rate
                  </button>
                </div>
                {/* Add to Cart Floating Button */}
                <button
                  className="absolute bottom-4 right-4 bg-gradient-to-tr from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none"
                  title="Add to Cart"
                  onClick={() => navigate(`/getProduct/${product._id}`)}
                >
                  <MdAddShoppingCart size={22} />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-1 rounded-full text-green-800 font-bold shadow text-sm">
                  ₹{product.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 text-lg mt-20">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
