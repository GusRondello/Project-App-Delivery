// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import getTotalPrice from '../helpers/getTotalPrice';
// import getCartItems from '../helpers/getCartItems';
import CartItemCard from './CartItemCard';
// import { sendOrder } from '../services';

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
  // const { useId: id } = getUserInfo();

  // const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  useEffect(() => {
    setItems(cartItems);
    // console.log('cartItems', cartItems);
  }, [cartItems]);

  const handleCheckout = async () => {
    console.log('xablau');
    // constroi um objeto no seguinte modelo para enviar ao backend
    // {
    //   "userId": "3",
    //   "sellerId": "2",
    //   "totalPrice": "190.56",
    //   "deliveryAddress": "Rua da Pamonha",
    //   "deliveryNumber": "27",
    //   "products": [
    //     { "id": 1, "quantity": 3},
    //     { "id": 2, "quantity": 6}
    //   ]
    // }
    // const order = {
    //   userId,
    //   sellerId: sellers[0].id,
    //   totalPrice,
    //   deliveryAddress: 'Rua da Pamonha',
    //   deliveryNumber: '27',
    //   products: cartItems.map((item) => {
    //     const { itemId: id, quantity } = item;
    //     return { itemId, quantity };
    //   }),
    // };
    // const response = await sendOrder(email, password);
    // if (response.error === true) {
    //   setErrorMessage(response.message);
    //   return navigate('/login');
    // }

    // // const { id } = response;
    // // navega para a rota /customer/orders/:id
    // return navigate(`/customer/orders/${id}`);
  };

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
        onClick={ () => handleCheckout() }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default CheckoutComponent;
