// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage';
import Products from './ProductsComp/Products';
import LoginPage from './LoginPage/LoginPage';
import CurrencyRates from './CurrencyComp/Currency';
import Categories from './CategoryDrawer/Category';
import AdminPage from './AdminPage/AdminPage';
import SignupPage from './SignupPage/SignupPage';
import { StickyNavbar } from './NavbarComp/Navbar';
import ProfilePage from './ProfilePage/Profile';
import UserOrder from './UserOrders/Order';

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
