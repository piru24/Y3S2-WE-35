import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import { MdFastfood, MdAddPhotoAlternate } from "react-icons/md";
import { FaRegCalendarAlt, FaRupeeSign, FaWeight } from "react-icons/fa";

export default function AddProducts() {
  const [isUploading, setIsUploading] = useState(false);
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

  const handleChangeText = (name, value) => {
    setProducts({ ...products, [name]: value.target.value });
  };

  const addProducts = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8070/products/addProduct", products)
      .then(() => {
        swal.fire({
          title: "Product added successfully!",
          icon: "success",
          background: "#f0fdf4",
          confirmButtonColor: "#16a34a"
        });
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        swal.fire({
          title: "Error!",
          text: "Failed to add product.",
          icon: "error",
          background: "#fef2f2",
          confirmButtonColor: "#dc2626"
        });
      });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    // Check file size (max 32MB for ImgBB free tier)
    if (file.size > 32 * 1024 * 1024) {
      swal.fire({
        title: "File too large",
        text: "Maximum image size is 32MB",
        icon: "error",
        background: "#fef2f2",
        confirmButtonColor: "#dc2626"
      });
      return;
    }
  
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);  // Must be "image" as field name
  
    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=d5839940867e10e07b645f263a300bed", // Replace with your key
        formData,
        // Remove explicit Content-Type header - let browser set it automatically
      );
  
      // Verify response structure
      if (!response.data.success || !response.data.data.url) {
        throw new Error(response.data.error?.message || "Upload failed");
      }

      setProducts({ ...products, image: response.data.data.url });
      swal.fire({
        title: "Image uploaded!",
        icon: "success",
        background: "#f0fdf4",
        confirmButtonColor: "#16a34a",
        timer: 2000
      });
    } catch (error) {
      swal.fire({
        title: "Image upload failed",
        text: "Please try again",
        icon: "error",
        background: "#fef2f2",
        confirmButtonColor: "#dc2626"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-100 py-12 flex items-center">
      <div className="container mx-auto px-4">
        <div className="bg-white/90 shadow-2xl rounded-3xl p-10 max-w-2xl mx-auto border border-green-100">
          <div className="flex items-center justify-center gap-3 mb-8">
            <MdFastfood className="text-4xl text-yellow-500" />
            <h1 className="text-3xl font-extrabold text-green-800">
              Add New Product
            </h1>
          </div>
          <form
            onSubmit={addProducts}
            className="space-y-8"
          >
            {/* Name and Brand */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="name" className="block text-green-800 font-semibold mb-2">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Enter product name"
                  required
                  onChange={(val) => handleChangeText("name", val)}
                  className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                />
              </div>
              <div className="relative">
                <label htmlFor="weight" className="block text-green-800 font-semibold mb-2">
                  Weight (g)
                </label>
                <div className="flex items-center">
                  <FaWeight className="text-green-500 mr-2" />
                  <input
                    name="weight"
                    type="number"
                    placeholder="Enter weight"
                    required
                    onChange={(val) => handleChangeText("weight", val)}
                    className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                  />
                </div>
              </div>
              {/* <div className="relative">
                <label htmlFor="brand" className="block text-green-800 font-semibold mb-2">
                  Brand
                </label>
                <input
                  name="brand"
                  type="text"
                  placeholder="Enter brand name"
                  required
                  onChange={(val) => handleChangeText("brand", val)}
                  className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                />
              </div> */}
            </div>

            {/* Price and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label htmlFor="price" className="block text-green-800 font-semibold mb-2">
                  Price (Rs.)
                </label>
                <div className="flex items-center">
                  <FaRupeeSign className="text-green-500 mr-2" />
                  <input
                    name="price"
                    type="number"
                    placeholder="Enter price"
                    required
                    onChange={(val) => handleChangeText("price", val)}
                    className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="upload_date" className="block text-green-800 font-semibold mb-2">
                  Upload Date
                </label>
                <div className="flex items-center">
                  <FaRegCalendarAlt className="text-green-500 mr-2" />
                  <input
                    name="upload_date"
                    type="date"
                    required
                    onChange={(val) => handleChangeText("upload_date", val)}
                    className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                  />
                </div>
              </div>             
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-green-800 font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Enter product description"
                required
                onChange={(val) => handleChangeText("description", val)}
                className="w-full px-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                rows="4"
              ></textarea>
            </div>

               {/* Image Upload */}
               <div className="relative">
              <label htmlFor="image" className="block text-green-800 font-semibold mb-2">
                Product Image
              </label>
              <div className="flex items-center">
                <MdAddPhotoAlternate className="text-green-500 mr-2" />
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full pl-4 pr-4 py-3 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
                  accept="image/*"
                  required
                  disabled={isUploading}
                />
              </div>
              {isUploading && (
                <p className="text-green-600 text-sm mt-2">Uploading image...</p>
              )}
              {products.image && (
                <div className="mt-4">
                  <p className="text-green-700 text-sm mb-2">Uploaded Image:</p>
                  <img
                    src={products.image}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg shadow"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center gap-2 text-lg"
            >
              <MdFastfood className="text-2xl" />
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
