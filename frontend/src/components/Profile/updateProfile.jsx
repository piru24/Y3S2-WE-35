import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate, useParams } from "react-router-dom";

const UpdateACC = () => {
  const id = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get("http://localhost:8090/User/profile").then((res) => {
          setInputs(res.data.user);
          console.log(res.data.user);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [id]);

  const sendData = async () => {
    try {
      const res = await axios.patch("http://localhost:8090/User/update", {
        name: inputs.name,
        mobile: inputs.mobile,
        email: inputs.email,
        address: inputs.address,
      });
      swal({
        title: "Details updated successfully!",
        icon: "success",
        button: "OK",
        timer: 3000,
      });
      navigate("/profile");
      return res.data;
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data);
        swal({
          title: "Update failed!",
          text: err.response.data.message || "Invalid input",
          icon: "error",
        });
      } else {
        console.error("Error:", err);
      }
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendData();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Update Account Details
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={inputs.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
              />
            </div>

            {/* Mobile */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-gray-700 font-medium mb-2"
              >
                Mobile
              </label>
              <input
                type="text"
                name="mobile"
                value={inputs.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your mobile number"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Address */}
            <div>
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                value={inputs.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateACC;