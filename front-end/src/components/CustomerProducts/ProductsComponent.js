import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TfiShoppingCart, TfiShoppingCartFull } from 'react-icons/tfi';
import CustomerContext from '../../context/CustomerContext';
import ProductsCard from './ProductsCard';
import getTotalPrice from '../../helpers/getTotalPrice';
import { ProductsDivS } from './Style';
import Button from '../Button';

const CartButton = styled(Button)`
  background-color: var(--tertiary);
  color: var(--buttonText);
  border-color: 1px solid var(--buttonBorder);
  position: fixed;
  bottom: 8px;
  right: 8px;
`;

function Products() {
  const { productsArray, cartItems } = useContext(CustomerContext);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  return (
    <div>
      <ProductsDivS>
        {productsArray?.map((product) => (
          <div key={ product.id }>
            <ProductsCard product={ product } />
          </div>
        ))}
      </ProductsDivS>
      {/* Botão de carrinho que exibe o valor total após o texto Ver Carrinho: e que ao ser clicado direciona
      para a tela /customer/checkout  */}
      <abbr title="Ver Carrinho">
        <CartButton
          data-testid="customer_products__button-cart"
          disabled={ cartItems.length === 0 }
          onClick={ () => navigate('/customer/checkout') }
        >
          {cartItems.length === 0 ? (
            <TfiShoppingCart />
          ) : (
            <TfiShoppingCartFull />
          )}
          <span data-testid="customer_products__checkout-bottom-value">
            {/* se o carrinho estiver vazio renderiza o ícone TfiShoppingCart e o R$ totalPrice e se o carrinho não estiver vazio renderiza o ícone TfiShoppingCartFull e o R$ totalPrice */}
            R$
            {' '}
            {totalPrice}
          </span>
        </CartButton>
      </abbr>
    </div>
  );
}

export default Products;
