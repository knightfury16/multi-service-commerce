// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Order from './components/Order';
// import Products from './components/Products';
// import ProductDetail from './components/ProductDetail';
// import Order from './components/Order';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/login"  element={<Login/>} />
        <Route path="/register"  element={<Register/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/order" element={<Order/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
