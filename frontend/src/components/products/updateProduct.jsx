import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";

export default function UpdateProducts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState({
    name: "",
    brand: "",
    price: "",
    weight: "",
    upload_date: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const getProductById = async () => {
      try {
        const res = await axios.get(`http://localhost:8070/products/getProduct/${id}`);
        setProducts(res.data.product);
      } catch (err) {
        console.error(err);
      }
    };
    getProductById();
  }, [id]);

  const handleChangeText = (name, val) => {
    setProducts({ ...products, [name]: val.target.value });
  };

  const UpdateProductsHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/products/updateProduct/${id}`, products);
      swal.fire(`Product updated successfully!`);
      navigate("/profile");
    } catch (error) {
      swal.fire("Update failed", error.response?.data?.message || "", "error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Product
        </h1>
        <form
          onSubmit={UpdateProductsHandler}
          className="bg-white shadow-md rounded-lg p-6 space-y-6"
        >
          {/* Name and Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                name="name"
                type="text"
                value={products.name}
                required
                onChange={(val) => handleChangeText("name", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="brand"
                className="block text-gray-700 font-medium mb-2"
              >
                Brand
              </label>
              <input
                name="brand"
                type="text"
                value={products.brand}
                required
                onChange={(val) => handleChangeText("brand", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Price and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="price"
                className="block text-gray-700 font-medium mb-2"
              >
                Price (Rs.)
              </label>
              <input
                name="price"
                type="number"
                value={products.price}
                required
                onChange={(val) => handleChangeText("price", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="weight"
                className="block text-gray-700 font-medium mb-2"
              >
                Weight (g)
              </label>
              <input
                name="weight"
                type="number"
                value={products.weight}
                required
                onChange={(val) => handleChangeText("weight", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Upload Date and Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="upload_date"
                className="block text-gray-700 font-medium mb-2"
              >
                Upload Date
              </label>
              <input
                name="upload_date"
                type="date"
                value={products.upload_date}
                required
                onChange={(val) => handleChangeText("upload_date", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="image"
                className="block text-gray-700 font-medium mb-2"
              >
                Image URL
              </label>
              <input
                name="image"
                type="text"
                value={products.image}
                required
                onChange={(val) => handleChangeText("image", val)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name="description"
              value={products.description}
              required
              onChange={(val) => handleChangeText("description", val)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}