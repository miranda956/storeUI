import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductList.css'

function ProductList() {
  // State to store the products
  const [products, setProducts] = useState([]);
     
  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('https://onlinestore-8ety.onrender.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched products:', data); // Log the data
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-details">
                <h2 className="product-name">{product.title}</h2>
                <p className="product-description">{product.body}</p>
                <p className="product-price">Price: ${product.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
