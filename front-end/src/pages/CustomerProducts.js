import React from 'react';
import Header from '../components/Header';
import ProductsComponent from '../components/CustomerProducts/ProductsComponent';
import CustomerProvider from '../context/CustomerProvider';

function Produtos() {
  return (
    <div>
      <Header />
      <CustomerProvider>
        <ProductsComponent />
      </CustomerProvider>
    </div>
  );
}

export default Produtos;
