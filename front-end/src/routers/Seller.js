import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Orders from '../pages/SellerOrders';
import OrderDetail from '../pages/SellerOrderDetail';

/* Rotas do vendedor */
function Seller() {
  return (
    <Routes>
      <Route exact path="/seller/orders" element={ <Orders /> } />
      <Route exact path="/seller/orders/:id" element={ <OrderDetail /> } />
    </Routes>
  );
}

export default Seller;
