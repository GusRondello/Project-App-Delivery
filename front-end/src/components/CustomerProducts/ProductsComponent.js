import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TfiShoppingCart, TfiShoppingCartFull } from 'react-icons/tfi';
import CustomerContext from '../../context/CustomerContext';
import ProductsCard from './ProductsCard';
import getTotalPrice from '../../helpers/getTotalPrice';
import { ProductsDivS } from './Style';

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
        <button
          id="cartButton"
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cartItems.length === 0 }
          onClick={ () => navigate('/customer/checkout') }
        >
          <span data-testid="customer_products__checkout-bottom-value">
            {/* se o carrinho estiver vazio renderiza o ícone TfiShoppingCart e o R$ totalPrice e se o carrinho não estiver vazio renderiza o ícone TfiShoppingCartFull e o R$ totalPrice */}
            {cartItems.length === 0
              ? <TfiShoppingCart />
              : <TfiShoppingCartFull />}
            R$
            {totalPrice}
          </span>
        </button>
      </abbr>
    </div>
  );
}

export default Products;
