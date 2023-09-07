import React from 'react';
import styled from 'styled-components';
import { useCartState } from './CartContext';

const OrderContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const OrderHeader = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const OrderSummary = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
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

const PlaceOrderButton = styled.button`
  background-color: #ff5733;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

function OrderPage() {
  const cart = useCartState();

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  const placeOrder = () => {
    // Implement the logic to place the order, e.g., sending the cart data to a server
    console.log('Order placed!');
  };

  return (
    <OrderContainer>
      <OrderHeader>Order Summary</OrderHeader>
      <OrderSummary>
        {cart.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price.toLocaleString()}</p>
            <p>Quantity: {product.quantity}</p>
          </div>
        ))}
      </OrderSummary>
      <TotalContainer>
        <TotalLabel>Total:</TotalLabel>
        ${calculateTotal().toLocaleString()}
      </TotalContainer>
      <PlaceOrderButton onClick={placeOrder}>Place Order</PlaceOrderButton>
    </OrderContainer>
  );
}

export default OrderPage;
