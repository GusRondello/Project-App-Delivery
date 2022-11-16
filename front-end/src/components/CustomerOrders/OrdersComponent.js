import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderCard from '../OrderCard';

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  padding: 16px;
  gap: 16px;
`;

export default function OrdersComponent() {
  const [orders, setOrders] = useState([]);

  /* Função responsável por pegar da API (api.getUsers) todas as compras do usuários */
  useEffect(() => {
    async function fetchSalle() {
      const { token } = getUserInfo();
      const data = await api.getAllCustomerOrders(token);

      const ordersDateFormatted = data.map((order) => {
        const { saleDate } = order;

        /* Converte a data para o formato dd/mm/yyyy e com o timezone brasileiro */
        const date = new Date(saleDate)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
          .split(' ')[0];

        return { ...order, saleDate: date };
      });

      setOrders(ordersDateFormatted);
    }
    fetchSalle();
  }, []);

  return (
    <Wrapper>
      {
        // Faz um map de orders chamando o componente OrderCard
        orders?.map((order) => (
          <OrderCard
            key={ order.id }
            order={ order }
            routePreffix="/customer/orders"
            testIdPreffix="customer_orders"
          />
        ))
      }
    </Wrapper>
  );
}
