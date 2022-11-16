import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CustomerContext from '../../context/CustomerContext';
import DeliveryContext from '../../context/DeliveryContext';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderProductsTable from './OrderProductsTable';
import PageTitle from '../Typography/PageTitle';
import Button from '../Button';
import FlexRow from '../FlexRow';
import FlexColumn from '../FlexColumn';

const CUSTOMER = 'customer_order_details__';
const DATATESTID_37 = `${CUSTOMER}element-order-details-label-order-id`;
const DATATESTID_38 = `${CUSTOMER}element-order-details-label-seller-name`;
const DATATESTID_39 = `${CUSTOMER}element-order-details-label-order-date`;
const DATATESTID_40 = `${CUSTOMER}element-order-details-label-delivery-status`;
const DATATESTID_46 = `${CUSTOMER}element-order-total-price`;
const DATATESTID_47 = `${CUSTOMER}button-delivery-check`;

const Status = styled.span`
  font-size: 14px;
  display: inline-block;
  padding: 6px 8px;
  background: ${(p) => p.theme.secondary};
  border-radius: 4px;
`;

function OrderDetailComponent() {
  const [orderStatus, setOrderStatus] = useState('');
  const [order, setOrder] = useState([]);
  const { sellers } = useContext(CustomerContext);
  const { isStatusUpdated, setIsStatusUpdated } = useContext(DeliveryContext);

  const navigate = useNavigate();

  /* useEffect para receber da API (api.getCustomerOrder) a order relacionada ao id da URL.
     É chamado novamente caso o status da order seja atualizado */
  useEffect(() => {
    async function fetchOrder() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];

      const data = await api.getCustomerOrder(token, salleId);
      const { saleDate } = data;

      /* Converte a data para o formato dd/mm/yyyy e com o timezone brasileiro */
      const date = new Date(saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        .split(' ')[0];

      setOrder({ ...data, saleDate: date });
      setOrderStatus(data.status);
      /* isStatusUpdated é uma variável que é alterada para false quando a API é chamada,
       preparando o contexto para receber a pŕoxima atualização do status. */
      setIsStatusUpdated(false);
    }
    fetchOrder();
  }, [isStatusUpdated]);

  /* Função responsável por pegar o id da order na URL e atualizar o status na API (api.updateOrderStatus) */
  const handleChangeStatus = async () => {
    const { token } = getUserInfo();
    const salleId = window.location.pathname.split('/')[3];
    const oderStatusUpdated = {
      status: 'Entregue',
    };

    const response = await api.updateOrderStatus(
      token,
      oderStatusUpdated,
      salleId,
    );
    setIsStatusUpdated(true);

    if (response.error === true) {
      setErrorMessage(response.message);
      return navigate('/login');
    }
  };

  if (!order || order.length === 0) {
    return null;
  }

  return (
    <div>
      <FlexRow as={ PageTitle } align="center" gap="8px">
        Detalhe do Pedido #
        <span data-testid={ DATATESTID_37 }>{order.id}</span>
        <Status data-testid={ `${DATATESTID_40}${order.id}` }>
          {order.status}
        </Status>
      </FlexRow>
      <FlexColumn gap="12px">
        <p>
          <strong>P. Vend: </strong>
          {/* Compara o id do vendedor em order com o id do vendedor em sellers e exibe o nome */}
          <span data-testid={ DATATESTID_38 }>
            {sellers.find((seller) => seller.id === order.sellerId)?.name}
          </span>
        </p>
        <p>
          <strong>Data: </strong>
          <span data-testid={ `${DATATESTID_39}` }>{order.saleDate}</span>
        </p>
        <Button
          data-testid={ DATATESTID_47 }
          disabled={ orderStatus !== 'Em Trânsito' }
          onClick={ () => handleChangeStatus() }
        >
          Marcar Como Entregue
        </Button>
        <OrderProductsTable />
        <FlexRow justify="flex-end">
          Total: R$
          <span data-testid={ DATATESTID_46 }>
            {order.totalPrice?.replace('.', ',')}
          </span>
        </FlexRow>
      </FlexColumn>
    </div>
  );
}

export default OrderDetailComponent;
