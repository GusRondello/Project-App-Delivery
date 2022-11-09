import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import GetUserInfo from '../../helpers/getUserInfo';
import OrderCard from './OrderCard';

function OrdersComponent() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  /* Função responsável por pegar da API (api.getAllSellerOrders) todas as ordens do vendedor */
  useEffect(() => {
    async function fetchSalle() {
      const { token } = GetUserInfo();
      const data = await api.getAllSellerOrders(token);
      const ordersDateFormatted = data.map((order) => {
        const { saleDate } = order;

        /* Converte a data para o formato dd/mm/yyyy e com o timezone brasileiro */
        const date = new Date(saleDate)
          .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

        return { ...order, saleDate: date };
      });

      setOrders(ordersDateFormatted);
    }
    fetchSalle();
  }, []);

  return (
    <div>
      {orders && orders.length !== 0 && (
        // Faz um map de orders chamando o componente OrderCard
        orders.map((order) => (
          <button
            key={ order.id }
            type="button"
            onClick={ () => navigate(`/seller/orders/${order.id}`) }
          >
            <OrderCard order={ order } />
          </button>
        ))
      )}
    </div>
  );
}

export default OrdersComponent;
