import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import getTotalPrice from '../../helpers/getTotalPrice';
import { sendOrder } from '../../services/apiAppDelivery';
import getUserInfo from '../../helpers/getUserInfo';
import CheckoutTable from './CheckoutTable';

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
  // console.log('totalPrice', totalPrice);
  useEffect(() => {
    setItems(cartItems);
    setSellersArray(sellers);
    setSelectedSeller(sellers[0]?.id);
  }, [cartItems, sellers]);

  const handleCheckout = async () => {
    const { id: userId, token } = getUserInfo();
    const totalPriceNumber = Number(totalPrice.replace(',', '.'));
    const order = {
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

    const salle = await sendOrder(token, order);
    if (salle.error === true) {
      setErrorMessage(salle.message);
      return navigate('/login');
    }
    const { id: saleId } = salle;

    return navigate(`/customer/orders/${saleId}`, { state: { salle } });
  };

  return (
    <div>
      <h2>Finalizar Pedido</h2>
      <div>
        <CheckoutTable />
        <p data-testid="customer_checkout__element-order-total-price">
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
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            value={ selectedSeller }
            onChange={ (e) => setSelectedSeller(e.target.value) }
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
    </div>
  );
}

export default CheckoutComponent;
