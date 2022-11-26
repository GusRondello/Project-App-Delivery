import React from 'react';
import OrderDetailComponent from '../components/CustomerOrderDetail/OrderDetailComponent';
import CustomerProvider from '../context/CustomerProvider';
import PrivateLayout from '../components/PrivateLayout';

function OrderDetail() {
  return (
    <CustomerProvider>
      <PrivateLayout>
        <OrderDetailComponent />
      </PrivateLayout>
    </CustomerProvider>
  );
}

export default OrderDetail;
