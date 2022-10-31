// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
import getTotalPrice from '../helpers/getTotalPrice';
// import getCartItems from '../helpers/getCartItems';
import CartItemCard from './CartItemCard';
import { sendOrder } from '../services';
import GetUserInfo from '../helpers/getUserInfo';

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
  const [address, setAddress] = useState({
    street: '',
    number: '',
  });
  const [selectedSeller, setSelectedSeller] = useState(sellers[0].id);

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  const handleCheckout = async () => {
    const { id: userId, token } = GetUserInfo();
    const totalPriceNumber = Number(totalPrice.replace(',', '.'));
    const order = {
      userId,
      sellerId: selectedSeller,
      totalPrice: totalPriceNumber,
      deliveryAddress: address.street,
      deliveryNumber: address.number,
      products: cartItems.map((item) => {
        const { id, quantity } = item;
        return { id, quantity };
      }),
    };
    const response = await sendOrder(token, order);
    if (response.error === true) {
      setErrorMessage(response.message);
      return navigate('/login');
    }
    const { id: saleId } = response;

    return navigate(`/customer/orders/${saleId}`);
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
        <p datatest-id="customer_checkout__element-order-total-price">
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
          <select
            name="seller"
            id="seller"
            value={ selectedSeller }
            onChange={ (e) => setSelectedSeller(e.target.value) }
          >
            {sellers.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
                datatest-id="customer_checkout__select-seller"
              >
                {seller.name}
              </option>
            ))}
          </select>
        </label>
        <form>
          <label htmlFor="street">
            Endereço:
            <input
              datatest-id="customer_checkout__input-address"
              type="text"
              name="street"
              id="street"
              placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
              value={ address.street }
              onChange={ (e) => setAddress({ ...address, street: e.target.value }) }
            />
          </label>
          <label htmlFor="number">
            Número:
            <input
              datatest-id="customer_checkout__input-address-number"
              type="text"
              name="number"
              id="number"
              placeholder="198"
              value={ address.number }
              onChange={ (e) => setAddress({ ...address, number: e.target.value }) }
            />
          </label>
        </form>
      </div>
      <button
        datatest-id="customer_checkout__button-submit-order"
        type="button"
        onClick={ () => handleCheckout() }
      >
        FINALIZAR PEDIDO
      </button>
    </div>
  );
}

export default CheckoutComponent;
