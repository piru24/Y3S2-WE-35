import React, { useState, useEffect } from 'react'
import axios from "axios"
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'

const UpdatePWD = () => {
  const navigate = useNavigate();

  // State for both passwords
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // (Optional) User info state
  const [user, setUser] = useState({ name: "", mobile: "", email: "", address: "", role: "" });

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8090/User/profile", { withCredentials: true });
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
        timer: 3000
      });
      navigate("/profile");
    } catch (err) {
      swal("Error updating password", err.response?.data?.message || "", "error");
    }
  };

  return (
    <div>
      <form className='forms' onSubmit={handleSubmit}>
        <h1>UPDATE YOUR PASSWORD</h1>
        <div className='inputs'>
          <label>ENTER YOUR OLD PASSWORD:</label>
          <input
            type="password"
            name="oldPassword"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className='inputs'>
          <label>ENTER YOUR NEW PASSWORD:</label>
          <input
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className='inputs'>
          <button type="submit" className="btn btn-primary">Update</button>
        </div>
        <div style={{ marginTop: 30 }}>
          <h2>User Info</h2>
          <h4>Name: {user.name}</h4>
          <h4>Mobile: {user.mobile}</h4>
          <h4>Email: {user.email}</h4>
          <h4>Address: {user.address}</h4>
          <h4>Role: {user.role}</h4>
        </div>
      </form>
    </div>
  );
};

export default UpdatePWD;
