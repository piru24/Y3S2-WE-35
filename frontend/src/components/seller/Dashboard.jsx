import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd, MdEdit, MdDelete, MdFastfood } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import Swal from "sweetalert2";
import ProductForm from "./ProductForm";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sellerInfo, setSellerInfo] = useState({});
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerRes = await axios.get(
          "http://localhost:8090/User/profile",
          {
            withCredentials: true,
          }
        );
        setSellerInfo(sellerRes.data.user);

        const productsRes = await axios.get(
          `http://localhost:8070/products/${sellerRes.data.user._id}/products`,
          { withCredentials: true }
        );
        setProducts(productsRes.data);
      } catch (error) {
        Swal.fire("Error", "Failed to load data", "error");
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (file.size > 32 * 1024 * 1024) {
      Swal.fire("File too large", "Max 32MB allowed", "error");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload?key=d5839940867e10e07b645f263a300bed",
        formData
      );

      if (!response.data.success) {
        throw new Error(response.data.error?.message || "Upload failed");
      }
      return response.data.data.url;
    } catch (error) {
      Swal.fire("Upload Failed", error.message, "error");
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8070/products/deleteProduct/${productId}`,
        {
          withCredentials: true,
        }
      );
      setProducts(products.filter((p) => p._id !== productId));
      Swal.fire("Deleted!", "Product removed successfully", "success");
    } catch (error) {
      Swal.fire("Error", "Deletion failed", "error");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const productData = {
        ...formData,
        sellerId: sellerInfo._id,
        sellerName: sellerInfo.name,
      };

      if (editingProduct) {
        const res = await axios.put(
          `http://localhost:8070/products/updateProduct/${editingProduct._id}`,
          productData,
          { withCredentials: true }
        );
        setProducts(
          products.map((p) => (p._id === res.data._id ? res.data : p))
        );
      } else {
        const res = await axios.post(
          "http://localhost:8070/products/addProduct",
          productData,
          { withCredentials: true }
        );
        setProducts([...products, res.data]);
      }
      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Operation failed",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-500 via-gray-400 to-green-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-green-500 p-3 rounded-full text-white shadow-lg">
              <MdFastfood className="text-3xl" />
            </div>
            <h1 className="text-3xl font-extrabold text-green-800">
              {sellerInfo.name}'s Products
            </h1>
          </div>
          <Link to="/addProduct">
          <button
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-3 rounded-full font-bold shadow hover:from-green-600 hover:to-green-800 transition flex items-center gap-2"
          >
            <MdAdd className="text-xl" /> Add Product
          </button>
          </Link>
        </div>

        {/* Products Table */}
        <div className="bg-white/90 rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-green-100 font-semibold text-green-800 text-sm uppercase">
            <div className="col-span-2">Product</div>
            <div className="col-span-1">Price</div>
            <div className="col-span-2">Package</div>
            <div className="col-span-2">Uploaded Date</div>
            <div className="col-span-2">Shop</div>
            {/* <div className="col-span-2">Shop</div> */}
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {products.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-b border-green-50 hover:bg-green-50 transition"
            >
              {/* Product Image & Name */}
              <div className="col-span-2 flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <span className="font-semibold text-green-800">
                  {product.name}
                </span>
              </div>

              {/* Price */}
              <div className="col-span-1 flex items-center gap-1">
                <FaRupeeSign className="text-green-500" />
                <span className="font-bold">{product.price}</span>
              </div>

              {/* Weight */}
              <div className="text-green-700 w-full col-span-2 flex items-center gap-1">
                for-{product.weight}-person
              </div>

              <div className="col-span-2 text-gray-600 text-sm">
                {product.upload_date
                  ? new Date(product.upload_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </div>

              {/* Description */}
              <div className="col-span-2 text-gray-600 text-sm">
                {product.description}
              </div>

              {/* Brand
              <div className="col-span-2 text-green-700">
                {product.brand}
              </div> */}

              {/* Actions */}
              <div className="col-span-2 flex justify-center gap-2">
                <button
                  onClick={() => {
                    setEditingProduct(product);
                    setShowForm(true);
                  }}
                  className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-yellow-200 text-sm"
                >
                  <MdEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-100 text-red-800 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-200 text-sm"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center bg-white/90 rounded-2xl p-12 shadow-sm mt-6">
            <MdFastfood className="text-6xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-green-800">
              No products found
            </h3>
            <p className="text-green-600 mt-2">
              Start by adding your first product
            </p>
          </div>
        )}

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl w-full">
              <ProductForm
                initialData={editingProduct}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProduct(null);
                }}
                onImageUpload={handleImageUpload}
                isUploading={isUploading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
