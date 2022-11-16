import React from 'react';
import PrivateLayout from '../components/PrivateLayout';
import OrderDetailComponent from '../components/SellerOrderDetail/OrderDetailComponent';

function SellerOrderDetail() {
  return (
    <PrivateLayout>
      <OrderDetailComponent />
    </PrivateLayout>
  );
}

export default SellerOrderDetail;
