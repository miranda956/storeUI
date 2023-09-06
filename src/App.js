import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './navbar';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Footer from './Footer';
import Category from './category'; // Import the Category component
import Tags from './tags'
import { CartProvider } from './CartContext';


function App() {
  return (
    <CartProvider> {/* Wrap your Router with CartProvider */}
      <Router>
        <CustomNavbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category" element={<Category />} />
          <Route path="/tags" element={<Tags />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
