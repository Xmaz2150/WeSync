import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Checkout from './pages/Checkout';
import SignIn from './pages/SignIn';
import Wishlist from './pages/Wishlist';  // Import Wishlist page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/wishlist" element={<Wishlist />} />  {/* Add Wishlist route */}
      </Routes>
    </Router>
  );
}

export default App;
