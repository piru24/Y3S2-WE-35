import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8020/Order/orderhistory',
          { withCredentials: true }
        );
        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setOrders([]);
      }
    };
    getOrders();
  }, []);

  return (
    <div style={{
      marginTop: '20px',
      width: '800px',
      marginLeft: '50px',
      fontSize: '20px'
    }}>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div 
            key={order._id} 
            style={{ 
              marginBottom: '30px',
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4>Order ID: {order._id}</h4>
                <h4>Amount: Rs.{order.amount}</h4>
                <h4>Status: 
                  <span style={{
                    color: order.status === 'delivered' ? 'green' : 
                          order.status === 'cancelled' ? 'red' : 'orange',
                    fontWeight: 'bold',
                    marginLeft: '10px'
                  }}>
                    {order.status}
                  </span>
                </h4>
              </div>
              <button
                onClick={() => navigate(`/notify/${order._id}`)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  height: '40px',
                  alignSelf: 'center'
                }}
              >
                View Details
              </button>
            </div>
            
            <table style={{ width: '100%', marginTop: '15px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f2f2f2' }}>
                  <th style={{ padding: '10px', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '10px', textAlign: 'right' }}>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px' }}>{product.name}</td>
                    <td style={{ padding: '10px', textAlign: 'right' }}>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;