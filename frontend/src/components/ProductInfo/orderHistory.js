import React, { useEffect, useState } from 'react'
import axios from 'axios'

const OrderHistory = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get(
          'http://localhost:8020/Order/orderhistory',
          { withCredentials: true }
        )
        // Handle both {orders: [...]} and [...] response
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.orders || []
        setOrders(data)
        console.log('Order history response:', data)
      } catch (err) {
        console.error('Error fetching order history:', err)
        setOrders([])
      }
    }
    getOrders()
  }, [])

  return (
    <div style={{
      marginTop: '20px',
      width: '500px',
      marginLeft: '50px',
      fontSize: '20px'
    }}>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, key) => (
          <div key={key} style={{ marginBottom: '30px' }}>
            <h4>Amount: Rs.{order.amount}</h4>
            <h4>Order Status: {order.status}</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, pkey) => (
                  <tr key={pkey}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
          </div>
        ))
      )}
    </div>
  )
}

export default OrderHistory
