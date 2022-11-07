// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import ProductsCard from './ProductsCard';
import getTotalPrice from '../../helpers/getTotalPrice';

function Products() {
  const { productsArray, cartItems } = useContext(CustomerContext);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();


  return (
    <div className="teste122121">
      <div>
        {productsArray?.map((product) => (
          <div key={ product.id }>
            <ProductsCard product={ product } />
          </div>
        ))}
      </div>
      {/* Botão de carrinho que exibe o valor total após o texto Ver Carrinho: e que ao ser clicado direciona
      para a tela /customer/checkout  */}
      <button
        type="button"
        data-testid="customer_products__button-cart"
        // desabilita caso não houver itens no carrinho
        disabled={ cartItems.length === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          {` R$ ${totalPrice}`}
        </span>
      </button>
    </div>
  );
}

export default Products;
