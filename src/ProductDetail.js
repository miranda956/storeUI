import React, { useState, useEffect } from 'react';
import { useParams, useNavigate  } from 'react-router-dom'; // Import useHistory
import './ProductDetail.css'; // Import your custom CSS file for styling
import { useCartDispatch } from './CartContext'; // Import the cart dispatch hook

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useCartDispatch();
  const navigate = useNavigate();

  // Access the history object to navigate

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

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    console.log('Product added to cart:', product);

    // Navigate to the CartPage after adding to cart
          navigate('/cart');
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
      <button className="add-to-cart-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
