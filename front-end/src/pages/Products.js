import React from 'react';
import Header from '../components/Header';
import ProductsComponent from '../components/Products/ProductsComponent';
import CustomerProvider from '../context/CustomerProvider';

function Produtos() {
  return (
    <div>
      <CustomerProvider>
        <Header />
        <ProductsComponent />
      </CustomerProvider>
    </div>
  );
}

export default Produtos;
