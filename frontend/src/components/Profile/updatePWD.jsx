import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const UpdatePWD = () => {
  const navigate = useNavigate();

  // State for both passwords
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // (Optional) User info state
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8090/User/profile", {
          withCredentials: true,
        });
        setUser(res.data.user || {});
      } catch (err) {
        console.log(err);
        swal("Error fetching user info", "", "error");
      }
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      swal("Both old and new password are required.", "", "warning");
      return;
    }
    try {
      await axios.patch(
        "http://localhost:8090/User/update/pwd",
        { oldPassword, newPassword },
        { withCredentials: true }
      );
      swal({
        title: "Password updated!",
        icon: "success",
        button: "OK",
        timer: 3000,
      });
      navigate("/profile");
    } catch (err) {
      swal("Error updating password", err.response?.data?.message || "", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Update Your Password
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Old Password */}
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Enter Your Old Password
              </label>
              <input
                type="password"
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter old password"
              />
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Enter Your New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter new password"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Update Password
              </button>
            </div>
          </form>

          {/* User Info */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Info</h2>
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
        </div>
      </div>
    </div>
  );
};

export default UpdatePWD;