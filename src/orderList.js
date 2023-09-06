// OrderList.js
import React, { useEffect, useState } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(''); // Store the user ID

  // Function to fetch orders based on user ID
  const fetchOrders = async () => {
    try {
      const response = await fetch(`https://onlinestore-8ety.onrender.com/users/${userId}/orders`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    // Fetch orders when the component mounts
    fetchOrders();
  }, [userId]);

  return (
    <div>
      <h2>Orders for User ID: {userId}</h2>
      <label>User ID: </label>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={fetchOrders}>Fetch Orders</button>

      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            Order ID: {order.id}, Total Price: ${order.totalPrice}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
