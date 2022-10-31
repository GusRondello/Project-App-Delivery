// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import getTotalPrice from '../helpers/getTotalPrice';
// import getCartItems from '../helpers/getCartItems';
import CartItemCard from './CartItemCard';

const sellers = [
  {
    id: 1,
    name: 'Sandra',
  },
  {
    id: 2,
    name: 'Maria',
  },
];

function CheckoutComponent() {
  const [items, setItems] = useState([]);
  // const [reload, setReload] = useState(false);
  const { cartItems } = useContext(CustomerContext);

  // const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  useEffect(() => {
    setItems(cartItems);
    // console.log('cartItems', cartItems);
  }, [cartItems]);

  // const handleCheckout = async (email, password) => {
  //   const response = await singInService(email, password);
  //   if (response.error === true) {
  //     setErrorMessage(response.message);
  //     return navigate('/login');
  //   }

  //   const { token, role, name } = response;
  //   // setCustomerName(name);
  //   // saveToken(token);
  //   // console.log(name, email, role);
  //   saveUserInfo({ name, email, role, token });
  //   if (role === 'seller') {
  //     return navigate('/seller/orders/');
  //   }
  //   if (role === 'administrator') {
  //     return navigate('/admin/manage');
  //   }
  //   return navigate('/customer/products');
  // };

  return (
    <div>
      <h2>Finalizar Pedido</h2>
      <div>
        <div>
          {items?.map((product, index) => (
            <div key={ product.id }>
              <CartItemCard product={ product } index={ index } />
            </div>
          ))}
        </div>
        <p>
          Total:
          {` R$ ${totalPrice}`}
        </p>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        {/* Input select para selecionar o vendedor tendo como título: P. Vendedora Resposável:
        tem como options o array sellers */}
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select name="seller" id="seller">
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        {/* Form para preencher o endereço de entrega */}
        <form>
          <label htmlFor="street">
            Endereço:
            <input type="text" name="street" id="street" />
          </label>
          <label htmlFor="number">
            Número:
            <input type="text" name="number" id="number" />
          </label>
        </form>
      </div>
      <button
        type="button"
        // onClick={ () => { handleCheckout } }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default CheckoutComponent;
