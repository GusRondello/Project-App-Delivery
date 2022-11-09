import React, { useEffect, useState/* , useContext */ } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderCard from './OrderCard';

function OrdersComponent() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  /* Função responsável por pegar da API (api.getUsers) todas as compras do usuários */
  useEffect(() => {
    async function fetchSalle() {
      const { token } = getUserInfo();
      const data = await api.getAllCustomerOrders(token);

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
      {
        // Faz um map de orders chamando o componente OrderCard
        orders?.map((order) => (
          <button
            key={ order.id }
            type="button"
            onClick={ () => navigate(`/customer/orders/${order.id}`) }
          >
            <OrderCard order={ order } />
          </button>
        ))
      }
    </div>
  );
}

export default OrdersComponent;
