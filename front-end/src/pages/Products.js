import React from 'react';
import Header from '../components/Header';
import Products from '../components/Products';
import CustomerProvider from '../context/CustomerProvider';

function Produtos() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <Products />
      </CustomerProvider>
    </div>
  );
}

export default Produtos;
