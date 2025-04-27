import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:8020/Order/dispatchedOrders`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching dispatched orders", err);
      }
    };
    getOrders();
  }, []);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get('http://localhost:8090/User/profile');
        setUser(userRes.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleAction = async (orderId, action) => {
    if (action === 'accept') {
      try {
        const selectedOrder = orders.find(order => order._id === orderId);
        if (!selectedOrder) throw new Error("Order not found");
        
        navigate('/test1', { 
          state: { 
            orderDetails: selectedOrder,
            cusid: selectedOrder.userId // Changed to cusid to match your Test1 component
          } 
        });
      } catch (err) {
        console.error(err);
        alert("Error accepting order.");
      }
    }
  };

  if (loading) return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#555'
    }}>
      Loading dashboard...
    </div>
  );

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{
        color: '#2c3e50',
        marginBottom: '25px',
        borderBottom: '2px solid #eee',
        paddingBottom: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        Delivery Dashboard
        {user && (
          <span style={{
            fontSize: '16px',
            color: '#7f8c8d',
            fontWeight: 'normal'
          }}>
            Logged in as: {user.name} ({user.role})
          </span>
        )}
      </h1>
      
      {orders.length > 0 ? (
        <div style={{
          overflowX: 'auto',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead style={{
              backgroundColor: '#3498db',
              color: 'white'
            }}>
              <tr>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Customer ID</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px 15px', textAlign: 'left' }}>Products</th>
                <th style={{ padding: '12px 15px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} style={{
                  borderBottom: '1px solid #eee',
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9',
                  ':hover': {
                    backgroundColor: '#f1f8ff'
                  }
                }}>
                  <td style={{ 
                    padding: '12px 15px', 
                    color: '#555',
                    fontFamily: 'monospace'
                  }}>
                    {order.userId.slice(-8).toUpperCase()}
                  </td>
                  <td style={{ 
                    padding: '12px 15px', 
                    color: '#27ae60', 
                    fontWeight: 'bold' 
                  }}>
                    Rs. {order.amount?.toFixed(2) || '0.00'}
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      backgroundColor: 
                        order.status === 'dispatched' ? '#f39c12' : 
                        order.status === 'On the way' ? '#3498db' : '#2ecc71',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 15px' }}>
                    <div style={{
                      maxHeight: '120px',
                      overflowY: 'auto',
                      padding: '5px'
                    }}>
                      {order.products?.map((product, pIndex) => (
                        <div key={pIndex} style={{
                          marginBottom: '5px',
                          padding: '5px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '4px',
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}>
                          <span style={{ fontWeight: 'bold' }}>{product.name}</span>
                          <span>Qty: {product.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ 
                    padding: '12px 15px', 
                    textAlign: 'center',
                    minWidth: '150px'
                  }}>
                    <button
                      onClick={() => handleAction(order._id, 'accept')}
                      style={{
                        backgroundColor: '#2ecc71',
                        color: 'white',
                        padding: '8px 16px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        ':hover': {
                          backgroundColor: '#27ae60',
                          transform: 'translateY(-1px)',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      Accept Delivery
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginTop: '20px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#7f8c8d', marginBottom: '10px' }}>
            No orders available for delivery
          </h3>
          <p style={{ color: '#95a5a6' }}>
            When new orders are dispatched, they will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboard;