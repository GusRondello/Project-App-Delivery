import React from 'react';
import Header from '../../components/Header/Header';
import OrdersComponent from '../../components/SellerOrders/OrdersComponent';
import { DivExterna, SellerOrdersS } from './Style';

function SellerOrders() {
  const location = window.location.pathname;
  return (
    <DivExterna>
      <SellerOrdersS>
        <Header location={ location } />
        <OrdersComponent />
      </SellerOrdersS>
    </DivExterna>
  );
}

export default SellerOrders;
