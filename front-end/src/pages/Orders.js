import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';
import OrdersComponent from '../components/Orders/OrdersComponent';

function Orders() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <OrdersComponent />
      </CustomerProvider>
    </div>
  );
}

export default Orders;
