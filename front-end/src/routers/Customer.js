import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import Products from '../pages/CustomerProducts';
import Checkout from '../pages/CustomerCheckout';
import Orders from '../pages/CustomerOrders';
import OrderDetail from '../pages/CustomerOrderDetail';

/* Rotas do cliente */
function Customer() {
  return (
    <Routes>
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetail /> } />
    </Routes>
  );
}

export default Customer;
