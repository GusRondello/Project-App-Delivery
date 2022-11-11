import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SellerOrders from '../pages/SellerOrders/SellerOrders';
import OrderDetail from '../pages/SellerOrderDetail';

/* Rotas do vendedor */
function Seller() {
  return (
    <Routes>
      <Route exact path="/seller/orders" element={ <SellerOrders /> } />
      <Route exact path="/seller/orders/:id" element={ <OrderDetail /> } />
    </Routes>
  );
}

export default Seller;
