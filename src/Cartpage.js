import React, { useState } from 'react';
import { useCartState, useCartDispatch } from './CartContext';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const CartContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CartHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const CartActions = styled.div`
  display: flex;
  align-items: center;

  button {
    background-color: #ff5733;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

  input {
    width: 40px;
    padding: 5px;
    text-align: center;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const TotalLabel = styled.p`
  font-weight: bold;
  margin-right: 10px;
`;

const SuccessMessage = styled.div`
  background-color: #4CAF50;
  color: #fff;
  text-align: center;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

function CartPage() {
  const cart = useCartState();
  const dispatch = useCartDispatch();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (productId, newQuantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const placeOrder = () => {
    // Implement the logic to place the order, e.g., sending the cart data to a server
    // For the sake of this example, let's assume the order is placed successfully.
    setShowSuccessMessage(true);

    // Hide the success message after 3 seconds (adjust as needed)
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <CartContainer>
      <CartHeader>Shopping Cart</CartHeader>
      {showSuccessMessage && (
        <SuccessMessage>
          Order created successfully!
        </SuccessMessage>
      )}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <CartItem key={product.id}>
              <div>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p>Price: ${product.price.toLocaleString()}</p>
              </div>
              <CartActions>
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                />
              </CartActions>
            </CartItem>
          ))}
          <TotalContainer>
            <TotalLabel>Total:</TotalLabel>
            ${calculateTotal().toLocaleString()}
          </TotalContainer>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </CartContainer>
  );
}

export default CartPage;
