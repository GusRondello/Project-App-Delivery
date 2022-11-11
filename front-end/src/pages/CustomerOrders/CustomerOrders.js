import React from 'react';
import Header from '../../components/Header/Header';
import OrdersComponent from '../../components/CustomerOrders/OrdersComponent';
import CustomerProvider from '../../context/CustomerProvider';
import { DivExterna, CustomerOrdersS } from './Style';

function Orders() {
  const location = window.location.pathname;
  return (
    <DivExterna>
      <CustomerOrdersS>
        <Header location={ location } />
        <CustomerProvider>
          <OrdersComponent />
        </CustomerProvider>
      </CustomerOrdersS>
    </DivExterna>
  );
}

export default Orders;
