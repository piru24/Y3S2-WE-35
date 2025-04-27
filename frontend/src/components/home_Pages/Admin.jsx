import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;

const Admin = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8090/User/users", { withCredentials: true });
        const users = response.data.users.map((user) => ({
          id: user._id,
          name: user.name,
          address: user.address,
          phone: user.mobile,
          email: user.email,
          role: user.role,
        }));
        setUsers(users);
        console.log(users);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition">
            <Link to="./viewOrders">View Orders</Link>
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Users</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, key) => (
                <tr key={key} className="hover:bg-gray-100">
                  <td className="px-6 py-4 text-sm text-gray-800">{user.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Admin;