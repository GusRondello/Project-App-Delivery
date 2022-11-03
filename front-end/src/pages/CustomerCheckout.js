import React from 'react';
import Header from '../components/Header';
import CheckoutComponent from '../components/CustomerCheckout/CheckoutComponent';
import CustomerProvider from '../context/CustomerProvider';

function Checkout() {
  return (
    <div>
      <Header />
      <CustomerProvider>
        <CheckoutComponent />
      </CustomerProvider>
    </div>
  );
}

export default Checkout;
