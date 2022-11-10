import React from 'react';
import Header from '../../components/Header';
import ProductsComponent from '../../components/CustomerProducts/ProductsComponent';
import CustomerProvider from '../../context/CustomerProvider';
import { DivExterna, ProductsS } from './Style';

function Produtos() {
  return (
    <DivExterna>
      <ProductsS>
        <Header />
        <CustomerProvider>
          <ProductsComponent />
        </CustomerProvider>
      </ProductsS>
    </DivExterna>
  );
}

export default Produtos;
