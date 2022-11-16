import React from 'react';
import CheckoutComponent from '../../components/CustomerCheckout/CheckoutComponent';
import PrivateLayout from '../../components/PrivateLayout';
import CustomerProvider from '../../context/CustomerProvider';

function Checkout() {
  return (
    <CustomerProvider>
      <PrivateLayout>
        <CheckoutComponent />
      </PrivateLayout>
    </CustomerProvider>
  );
}

export default Checkout;
