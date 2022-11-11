import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import getTotalPrice from '../../helpers/getTotalPrice';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import CheckoutTable from './CheckoutTable';
import { CheckoutTableS } from './Style';

function CheckoutComponent() {
  const [items, setItems] = useState([]);
  const [sellersArray, setSellersArray] = useState([]);
  const { cartItems, sellers } = useContext(CustomerContext);
  const [address, setAddress] = useState({
    street: '',
    number: '',
  });
  const [selectedSeller, setSelectedSeller] = useState(sellers[0]?.id || '');

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  /* useEffect responsável por toda vez que atualizar no context os sellers ou os itens
     do carrinho, atualiza/adicionar ao estado local */
  useEffect(() => {
    setItems(cartItems);
    setSellersArray(sellers);
    setSelectedSeller(sellers[0]?.id);
  }, [cartItems, sellers]);

  /* Função responsável por montar a nova order e enviar para a API (api.sendOrder) */
  const handleCheckout = async () => {
    const { id: userId, token } = getUserInfo();
    const totalPriceNumber = Number(totalPrice.replace(',', '.'));
    const newOrder = {
      userId,
      sellerId: selectedSeller,
      totalPrice: totalPriceNumber,
      deliveryAddress: address.street,
      deliveryNumber: address.number,
      products: items.map((item) => {
        const { id, quantity } = item;
        return { id, quantity };
      }),
    };

    const order = await api.sendOrder(token, newOrder);
    if (order.error === true) {
      setErrorMessage(order.message);
      return navigate('/login');
    }
    const { id: orderId } = order;

    /* Envia pelo state do navigate a venda selecionada, apesar de não estar usando.
       Apenas para mostrar que é possível enviar dados pelo state do navigate */
    return navigate(`/customer/orders/${orderId}`, { state: { order } });
  };

  return (
    <CheckoutTableS>
      <h1>Finalizar Pedido</h1>
      <div id="checkoutTable">
        <CheckoutTable />
        <p id="totalPrice" data-testid="customer_checkout__element-order-total-price">
          Total:
          {` R$ ${totalPrice}`}
        </p>
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <div>
        <label htmlFor="seller">
          P. Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            value={ selectedSeller }
            onChange={ (event) => setSelectedSeller(event.target.value) }
          >
            {sellersArray.map((seller) => (
              <option
                key={ seller.id }
                value={ seller.id }
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
              data-testid="customer_checkout__input-address"
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
              data-testid="customer_checkout__input-address-number"
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
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ () => handleCheckout() }
      >
        FINALIZAR PEDIDO
      </button>
    </CheckoutTableS>
  );
}

export default CheckoutComponent;
