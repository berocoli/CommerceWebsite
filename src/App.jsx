import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // HomePage bileşenini içe aktar
import Products from './Products'; // Products bileşenini içe aktar
import LoginPage from './LoginPage';

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
      </Routes>
    </Router>
  );
}

export default App;
