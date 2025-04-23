import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/styles/viewOrders.css'
const ViewOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const res = await axios.get(`http://localhost:8020/Order/getOrders`);
      setOrders(res.data);
      console.log(res.data);
    };
    getOrders();
  }, []);

  const handleUpdateState = async (orderId, newState) => {
    try {
      const res = await axios.put(
        `http://localhost:8020/Order/updateOrder/${orderId}`,
        { status: newState }
      );
      const newUpdateOrder = res.data;

      setOrders((prevOrders) => {
        const newOrders = [...prevOrders];

        const arrIndex = newOrders.findIndex(
          (order) => order._id === newUpdateOrder._id
        );
        newOrders[arrIndex] = newUpdateOrder;

        return newOrders;
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {orders.length > 0 &&
        orders.map((order, key) => (
          <div key={key}>
            <h3>User ID {order.userId}</h3>
            <h3>AMOUNT(Rs.) {order.amount}</h3>
            <h3>Order Status {order.status}</h3>

            <table>
              <th>Name</th>
              <th>Quantity</th>
              {order.products.map((product, _id) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </table>
            <button onClick={() => handleUpdateState(order._id, "pending")}>
              pending
            </button>
            <button onClick={() => handleUpdateState(order._id, "confirmed")}>
              confirmed
            </button>
            <button onClick={() => handleUpdateState(order._id, "dispatched")}>
              dispatched
            </button>
            <button onClick={() => handleUpdateState(order._id, "delivered")}>
              delivered
            </button>
          </div>
        ))}
    </div>
  );
};

export default ViewOrders;
