// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
      <Switch>
        <Route path="/" exact  component={Home} />
        <Route path="/login"  component={Login} />
        <Route path="/register"  component={Register} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/products" component={Products} />
        <Route path="/order" component={Order} /> 
      </Switch>
    </Router>
  );
};

export default App;
