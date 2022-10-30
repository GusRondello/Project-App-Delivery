import React from 'react';
import Header from '../components/Header';
import CustomerProvider from '../context/CustomerProvider';

function Checkout() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <p>Checkout</p>
      </CustomerProvider>
    </div>
  );
}

export default Checkout;
