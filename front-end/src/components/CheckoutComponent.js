// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { /* useEffect, useState,  */useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import getTotalPrice from '../helpers/getTotalPrice';
// import getCartItems from '../helpers/getCartItems';
import CartItemCard from './CartItemCard';

function CheckoutComponent() {
  // const [cartItems, setCartItems] = useState(getCartItems() || []);
  // const [reload, setReload] = useState(false);
  const { cartItems } = useContext(CustomerContext);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  console.log('totalPrice', totalPrice);
  // const items = getCartItems();
  // console.log('items', items);
  // useEffect(() => {
  //   // sempre que atualizar o productsArray, recebe os items do getCartItems();
  //   // function getItems() {
  //   const items2 = getCartItems();
  //   console.log('items', items2);
  //   setCartItems(items);
  //   // }
  //   // getItems();
  // }, [isCartUpdated]);
  console.log('cartItems', cartItems);

  return (
    <div>
      <h2>Finalizar Pedido</h2>
      <div>
        {cartItems?.map((product, index) => (
          <div key={ product.id }>
            <CartItemCard product={ product } index={ index } />
          </div>
        ))}
      </div>
      {/* Botão de carrinho que exibe o valor total após o texto Ver Carrinho: e que ao ser clicado direciona
      para a tela /customer/checkout  */}
      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => navigate('/customer/checkout') }
      >
        Ver Carrinho:
        {` R$ ${totalPrice}`}
      </button>
    </div>
  );
}

export default CheckoutComponent;
