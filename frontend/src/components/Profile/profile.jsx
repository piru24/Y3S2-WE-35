import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

const Profile = () => {
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8090/User/profile", { withCredentials: true })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendProductRequest = async (sellerId) => {
    const res = await axios
      .get(`http://localhost:8070/products/${sellerId}/products`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setUser(data.user);
      sendProductRequest(data.user._id).then((data) => setProducts(data));
    });
  }, []);

  const handleDeleteAcc = () => {
    swal({
      title: "Are you sure?",
      text: "Do you want to delete your account?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal({
          title: "Your account is being deleted",
          icon: "info",
          buttons: false,
          timer: 2000,
        });

        axios.delete("http://localhost:8090/User/deleteUser").then(() => {
          swal({
            title: "Your account has been deleted",
            icon: "success",
            buttons: false,
            timer: 2000,
          }).then(() => {
            setTimeout(() => {
              window.location.href = "/login";
            }, 1500);
          });
        });
      } else {
        swal({
          title: "Your account is saved",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  const handleDelete = (product_id) => {
    swal({
      title: "Are you sure?",
      text: "You want to delete this Product?",
      icon: "warning",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Product is deleted", {
          icon: "success",
          buttons: false,
          timer: 2000,
        });

        axios.delete(
          `http://localhost:8070/products/deleteProduct/${product_id}`
        );

        const newProductlist = products.filter(
          (product) => product._id !== product_id
        );

        setProducts(newProductlist);
      } else {
        swal({
          text: "Your Products is saved!",
          buttons: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
          {user && (
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Mobile:</span> {user.mobile}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Address:</span> {user.address}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Role:</span> {user.role}
              </p>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate(`/updateUser/${user._id}`)}
            >
              Update Account
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate(`/updatePWD/${user._id}`)}
            >
              Update Password
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              onClick={handleDeleteAcc}
            >
              Delete Account
            </button>
          </div>
        </div>

        {user.role === "seller" && (
          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">My Products</h2>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => navigate("/addProduct")}
              >
                Add Product
              </button>
            </div>
            {products.length > 0 ? (
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Name
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Brand
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Description
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Weight
                      </th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {product.brand}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          Rs. {product.price}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {product.description}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          {product.weight}g
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-800">
                          <div className="flex gap-2">
                            <button
                              className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition"
                              onClick={() => navigate(`/updateProduct/${product._id}`)}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                              onClick={() => handleDelete(product._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-center text-gray-600 mt-4">
                No products available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;