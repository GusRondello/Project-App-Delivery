import React, { useEffect, useState/* , useContext */ } from 'react';
import { useNavigate } from 'react-router-dom';
// import CustomerContext from '../context/CustomerContext';
// import getTotalPrice from '../helpers/getTotalPrice';
// import DetailItemCard from './DetailItemCard';
import { getAllOrders } from '../../services';
import GetUserInfo from '../../helpers/getUserInfo';
import OrderCard from './OrderCard';

function OrdersComponent() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSalle() {
      const { token } = GetUserInfo();
      const data = await getAllOrders(token);

      const ordersDateFormatted = data.map((order) => {
        const { saleDate } = order;
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
            onClick={ () => navigate(`/customer/orders/${order.id}`) }
          >
            <OrderCard order={ order } />
          </button>
        ))
      )}
    </div>
  );
}

export default OrdersComponent;
