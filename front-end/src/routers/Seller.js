import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Orders from '../pages/SellerOrders';

function Seller() {
  return (
    <Routes>
      <Route exact path="/seller/orders" element={ <Orders /> } />
    </Routes>
  );
}

export default Seller;
