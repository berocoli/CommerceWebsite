// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './UserPage/Home/HomePage';
import Products from './UserPage/ProductsComp/Products';
import LoginPage from './UserPage/LoginPage/LoginPage';
import CurrencyRates from './UserPage/CurrencyComp/Currency';
import Categories from './UserPage/CategoryDrawer/Category';
import AdminPage from './AdminPage/AdminPage';
import SignupPage from './UserPage/SignupPage/SignupPage';
import { StickyNavbar } from './UserPage/NavbarComp/Navbar';
import ProfilePage from './UserPage/ProfilePage/Profile';
import UserOrder from './UserPage/UserOrders/Order';
import ProductPage from './UserPage/ProductsComp/ProductPage';

function App() {
  // This is our single source of truth for cartCount
  const [cartCount, setCartCount] = useState(parseInt(localStorage.getItem('cartCount') || '0', 10));

  const updateCartCount = (newCount) => {
    setCartCount(newCount);
    localStorage.setItem('cartCount', newCount);
  };

  return (
    <Router>
      {/* Pass cartCount and possibly updateCartCount to StickyNavbar 
          if you need to. StickyNavbar can then pass cartCount to CustomSpeedDial. */}
      <StickyNavbar cartCount={cartCount} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* Pass updateCartCount to Products */}
        <Route path="/products" element={<Products updateCartCount={updateCartCount} />} />
        <Route path="/product/page" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/currency" element={<CurrencyRates />} />
        <Route path="/category" element={<Categories />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/navbar" element={<StickyNavbar cartCount={cartCount} />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order" element={<UserOrder />} />
      </Routes>
    </Router>
  );
}

export default App;
