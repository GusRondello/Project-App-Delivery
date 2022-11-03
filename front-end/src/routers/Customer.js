import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../pages/CustomerProducts';
import Checkout from '../pages/CustomerCheckout';
import Orders from '../pages/CustomerOrders';
import OrderDetail from '../pages/CustomerOrderDetail';

function Customer() {
  return (
    <Routes>
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/checkout" element={ <Checkout /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetail /> } />
    </Routes>
  );
}

export default Customer;
