import React from 'react';
import ProductsComponent from '../../components/CustomerProducts/ProductsComponent';
import CustomerProvider from '../../context/CustomerProvider';
import PrivateLayout from '../../components/PrivateLayout';

function Produtos() {
  return (
    <CustomerProvider>
      <PrivateLayout>
        <ProductsComponent />
      </PrivateLayout>
    </CustomerProvider>
  );
}

export default Produtos;
