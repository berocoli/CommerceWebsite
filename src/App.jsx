import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Home/HomePage'; // HomePage bileşenini içe aktar
import Products from './ProductsComp/Products'; // Products bileşenini içe aktar
import LoginPage from './LoginPage/LoginPage';
import CurrencyRates from './CurrencyComp/Currency';
import Categories from './CategoryDrawer/Category';
import AdminPage from './AdminPage/AdminPage';
import SignupPage from './SignupPage/SignupPage';
import { StickyNavbar } from './NavbarComp/Navbar';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ana sayfa için rota */}
        <Route path="/" element={<HomePage />} />

        {/* Products sayfası için rota */}
        <Route path="/products" element={<Products />} />

        {/*Login Sayfası için rota */}
        <Route path="/login" element={<LoginPage />} />

        {/*Currency Sayfası için rota */}
        <Route path="/currency" element={<CurrencyRates />} />

        {/*Category sayfası için rota*/}
        <Route path="/category" element={<Categories />} />

        <Route path="/admin" element={<AdminPage />} />

        <Route path="/signup" element={<SignupPage />} />

        <Route path="/navbar" element={<StickyNavbar />} />
        {/*404 sayfası için rota*/}
      </Routes>
    </Router>
  );
}

export default App;
