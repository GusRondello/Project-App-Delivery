import React from 'react';
import OrdersComponent from '../../components/CustomerOrders/OrdersComponent';
import CustomerProvider from '../../context/CustomerProvider';
import PrivateLayout from '../../components/PrivateLayout';

function Orders() {
  return (
    <CustomerProvider>
      <PrivateLayout>
        <OrdersComponent />
      </PrivateLayout>
    </CustomerProvider>
  );
}

export default Orders;
