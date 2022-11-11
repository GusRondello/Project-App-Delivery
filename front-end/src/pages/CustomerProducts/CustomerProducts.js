import React from 'react';
import Header from '../../components/Header/Header';
import ProductsComponent from '../../components/CustomerProducts/ProductsComponent';
import CustomerProvider from '../../context/CustomerProvider';
import { DivExterna, ProductsS } from './Style';

function Produtos() {
  const location = window.location.pathname;
  return (
    <DivExterna>
      <ProductsS>
        <Header location={ location } />
        <CustomerProvider>
          <ProductsComponent />
        </CustomerProvider>
      </ProductsS>
    </DivExterna>
  );
}

export default Produtos;
