import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { TfiShoppingCart, TfiShoppingCartFull } from 'react-icons/tfi';
import CustomerContext from '../../context/CustomerContext';
import ProductsCard from './ProductsCard';
import getTotalPrice from '../../helpers/getTotalPrice';
import { ProductsDivS } from './Style';

const CartButton = styled.button`
  background-color: var(--tertiary);
  color: var(--buttonText);
  border: 1px solid var(--buttonBorder);
  width: 200px;
  height: 30px;
  line-height: 2.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
  border-radius: 4px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background-color: var(--secondary);
  }
  // posiciona o botão no canto inferior direito da tela
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
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cartItems.length === 0 }
          onClick={ () => navigate('/customer/checkout') }
        >
          <span data-testid="customer_products__checkout-bottom-value">
            {/* se o carrinho estiver vazio renderiza o ícone TfiShoppingCart e o R$ totalPrice e se o carrinho não estiver vazio renderiza o ícone TfiShoppingCartFull e o R$ totalPrice */}
            {cartItems.length === 0 ? (
              <TfiShoppingCart />
            ) : (
              <TfiShoppingCartFull />
            )}
            R$
            {totalPrice}
          </span>
        </CartButton>
      </abbr>
    </div>
  );
}

export default Products;
