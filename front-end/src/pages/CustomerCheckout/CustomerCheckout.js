import React from 'react';
import Header from '../../components/Header/Header';
import CheckoutComponent from '../../components/CustomerCheckout/CheckoutComponent';
import CustomerProvider from '../../context/CustomerProvider';
import { DivExterna, CustomerCheckoutS } from './Style';

function Checkout() {
  const location = window.location.pathname;
  return (
    <DivExterna>
      <CustomerCheckoutS>
        <Header location={ location } />
        <CustomerProvider>
          <CheckoutComponent />
        </CustomerProvider>
      </CustomerCheckoutS>
    </DivExterna>
  );
}

export default Checkout;
