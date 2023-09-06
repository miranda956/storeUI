import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css'; // Import your custom CSS file for styling
import { useCartDispatch } from './CartContext'; // Import the cart dispatch hook

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useCartDispatch(); // Access the cart dispatch function

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://onlinestore-8ety.onrender.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  // Define a function to handle adding the product to the cart
  const addToCart = () => {
    // Dispatch an action to add the product to the cart
    dispatch({ type: 'ADD_TO_CART', payload: product });
    console.log('Product added to cart:', product);
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p className="product-description">{product.body}</p>
      <p className="product-price">Price: ${product.price}</p>
      {/* Add a button to trigger the addToCart function */}
      <button className="add-to-cart-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
