import React from 'react';
import PrivateLayout from '../../components/PrivateLayout';
import OrdersComponent from '../../components/SellerOrders/OrdersComponent';

function SellerOrders() {
  return (
    <PrivateLayout>
      <OrdersComponent />
    </PrivateLayout>
  );
}

export default SellerOrders;
