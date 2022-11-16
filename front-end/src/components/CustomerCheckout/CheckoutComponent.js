import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import getTotalPrice from '../../helpers/getTotalPrice';
import saveTotalPrice from '../../helpers/saveTotalPrice';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import saveCart from '../../helpers/saveCartItems';
import CheckoutTable from './CheckoutTable';
import PageTitle from '../Typography/PageTitle';
import TextField from '../FormComponents/TextField';
import SelectField from '../FormComponents/SelectField';
import FieldSet from '../FormComponents/FieldSet';
import FlexColumn from '../FlexColumn';
import Button from '../Button';
import FlexRow from '../FlexRow';

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
    setSelectedSeller(sellers[0]?.id.toString());
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
    saveCart([]);
    saveTotalPrice(0);

    /* Envia pelo state do navigate a venda selecionada, apesar de não estar usando.
       Apenas para mostrar que é possível enviar dados pelo state do navigate */
    return navigate(`/customer/orders/${orderId}`, { state: { order } });
  };

  return (
    <FlexColumn gap="18px">
      <PageTitle>Finalizar Pedido</PageTitle>
      <FlexColumn gap="8px">
        <CheckoutTable />
        <FlexRow justify="flex-end">
          <p data-testid="customer_checkout__element-order-total-price">
            Total: R$
            {' '}
            {totalPrice}
          </p>
        </FlexRow>
      </FlexColumn>
      <PageTitle>Detalhes e Endereço para Entrega</PageTitle>
      <FieldSet
        button={
          <Button
            data-testid="customer_checkout__button-submit-order"
            onClick={ handleCheckout }
          >
            Finalizar Pedido
          </Button>
        }
      >
        {selectedSeller && (
          <SelectField
            label="P. Vendedora Responsável"
            data-testid="customer_checkout__select-seller"
            name="seller"
            id="seller"
            value={ selectedSeller }
            onChange={ (event) => setSelectedSeller(event.target.value) }
            options={ sellersArray.map((seller) => ({
              label: seller.name,
              value: seller.id.toString(),
            })) }
          />
        )}
        <TextField
          label="Endereço"
          data-testid="customer_checkout__input-address"
          name="street"
          placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
          value={ address.street }
          onChange={ (e) => setAddress({ ...address, street: e.target.value }) }
        />
        <TextField
          label="Número"
          data-testid="customer_checkout__input-address-number"
          type="text"
          name="number"
          placeholder="198"
          value={ address.number }
          onChange={ (e) => setAddress({ ...address, number: e.target.value }) }
        />
      </FieldSet>
    </FlexColumn>
  );
}

export default CheckoutComponent;
