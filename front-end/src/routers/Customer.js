import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Products from '../pages/Products';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import OrderDetail from '../pages/OrderDetail';

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
