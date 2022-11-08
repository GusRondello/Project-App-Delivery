import React from 'react';
import Header from '../components/Header';
import OrderDetailComponent from '../components/CustomerOrderDetail/OrderDetailComponent';
import CustomerProvider from '../context/CustomerProvider';

function OrderDetail() {
  return (
    <div>
      <Header />
      <CustomerProvider>
        <OrderDetailComponent />
      </CustomerProvider>
    </div>
  );
}

export default OrderDetail;
