import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const Test1 = () => {


  const [user, setUser] = useState(null);
  const location = useLocation();
  const { orderDetails, cusid } = location.state || {};
  const [status, setStatus] = useState(orderDetails?.status || '');

  const handleStartDelivery = async () => {
    if (!orderDetails?._id) return;
    

    try {
      const response = await axios.put(
        `http://localhost:8020/Order/updateOrder/${orderDetails._id}`,
        { status: 'on the way' }
      );
      
      setStatus(response.data.status);
      alert('Delivery started! Customer has been notified.');
      
      // You can add additional logic here to notify the customer
    } catch (error) {
      console.error('Error starting delivery:', error);
      alert('Failed to start delivery');
    } finally {
    
    }
  };

  const handleDoorDelivery = async () => {
    if (!orderDetails?._id) return;
    

    try {
      const response = await axios.put(
        `http://localhost:8020/Order/updateOrder/${orderDetails._id}`,
        { status: 'arrived' }
      );
      
      setStatus(response.data.status);
      alert('Delivery arrived! Customer has been notified.');
      
      // You can add additional logic here to notify the customer
    } catch (error) {
      console.error('Error ending delivery:', error);
      alert('Failed to end delivery');
    } finally {
    
    }
  };

  const handleEndDelivery = async () => {
    if (!orderDetails?._id) return;
    

    try {
      const response = await axios.put(
        `http://localhost:8020/Order/updateOrder/${orderDetails._id}`,
        { status: 'completed' }
      );
      
      setStatus(response.data.status);
      alert('Delivery completed! Customer has been notified.');
      
      // You can add additional logic here to notify the customer
    } catch (error) {
      console.error('Error ending delivery:', error);
      alert('Failed to end delivery');
    } finally {
    
    }
  };


  useEffect(() => {
    axios.get(`http://localhost:8090/User/${cusid}`)
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => console.error('Error fetching user details:', error));
  }, []);
  if (!user) {
    return <div>Loading user details...</div>;
  }


  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Order Delivery Details</h2>
      
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '25px', 
        borderRadius: '8px',
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#3498db', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Order #{orderDetails._id.slice(-6).toUpperCase()}
        </h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#2c3e50' }}>Order Information</h4>
            <p><strong>Amount:</strong> Rs. {orderDetails.amount}</p>
            <p><strong>Status:</strong> <span style={{ 
              color: orderDetails.status === 'Delivered' ? '#27ae60' : 
                    orderDetails.status === 'On the way' ? '#f39c12' : '#3498db',
              fontWeight: 'bold'
            }}>{orderDetails.status}</span></p>
            
            <h4 style={{ marginTop: '20px', color: '#2c3e50' }}>Products:</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {orderDetails.products.map((product, index) => (
                <li key={index} style={{ marginBottom: '8px', padding: '8px', backgroundColor: '#fff', borderRadius: '4px' }}>
                  {product.name} - Qty: {product.quantity}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ flex: 1 }}>
            <h4 style={{ color: '#2c3e50' }}>Customer Information</h4>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Phone:</strong> {user.mobile}</p>
            
            <h4 style={{ marginTop: '20px', color: '#2c3e50' }}>Delivery Address:</h4>
                <h5>{user.address}</h5>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleStartDelivery} 
         style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Start Delivery
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleDoorDelivery} 
         style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Arrived 
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button 
          onClick={handleEndDelivery} 
         style={{
            backgroundColor: '#3498db',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Delivery Completed
        </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Test1;