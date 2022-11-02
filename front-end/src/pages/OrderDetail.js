import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';
import OrderDetailComponent from '../components/OrderDetailComponent';

function OrderDetail() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <OrderDetailComponent />
      </CustomerProvider>
    </div>
  );
}

export default OrderDetail;
