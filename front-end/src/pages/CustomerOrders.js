import React from 'react';
import Header from '../components/Header/Header';
import OrdersComponent from '../components/CustomerOrders/OrdersComponent';
import CustomerProvider from '../context/CustomerProvider';

function Orders() {
  return (
    <div>
      <Header />
      <CustomerProvider>
        <OrdersComponent />
      </CustomerProvider>
    </div>
  );
}

export default Orders;
