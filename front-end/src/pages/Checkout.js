import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';
import CheckoutComponent from '../components/CheckoutComponent';

function Checkout() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <CheckoutComponent />
      </CustomerProvider>
    </div>
  );
}

export default Checkout;
