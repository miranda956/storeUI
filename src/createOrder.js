import React, { useState, useEffect } from 'react';

function OrderForm() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://onlinestore-8ety.onrender.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
  }, []);

  // Function to handle product selection
  const handleProductSelect = (productId, quantity) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const updatedProduct = {
        ...product,
        quantity,
      };
      setSelectedProducts([...selectedProducts, updatedProduct]);
      setTotalPrice(totalPrice + product.price * quantity);
    }
  };

  // Function to handle order submission
  const handleSubmitOrder = async () => {
    const userId = 1; // You can get the user ID from your authentication system
    const productIds = selectedProducts.map((product) => product.id);

    try {
      const response = await fetch('http://localhost:3500/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          productIds,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Reset selected products and total price
      setSelectedProducts([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <h2>Create New Order</h2>
      <div>
        <h3>Available Products</h3>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.title} - ${product.price}
              <input
                type="number"
                min="0"
                value={product.quantity || 0}
                onChange={(e) => handleProductSelect(product.id, parseInt(e.target.value))}
              />
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Selected Products</h3>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.title} - ${product.price} x {product.quantity}
            </li>
          ))}
        </ul>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <button onClick={handleSubmitOrder}>Submit Order</button>
      </div>
    </div>
  );
}

export default OrderForm;
