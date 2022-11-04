// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import DetailItemCard from './DetailItemCard';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderProductsTable from './OrderProductsTable';

const CUSTOMER = 'customer_order_details__';
const DATATESTID_37 = `${CUSTOMER}element-order-details-label-order-id`;
// const DATATESTID_38 = `${CUSTOMER}element-order-details-label-seller-name`;
const DATATESTID_39 = `${CUSTOMER}element-order-details-label-order-date`;
const DATATESTID_40 = `${CUSTOMER}element-order-details-label-delivery-status`;
const DATATESTID_46 = `${CUSTOMER}element-order-total-price`;
const DATATESTID_47 = `${CUSTOMER}button-delivery-check`;

function OrderDetailComponent() {
  const [order, setOrder] = useState([]);

  const navigate = useNavigate();

  // useEffect responsável por receber os detales da order da api
  useEffect(() => {
    async function fetchOrder() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];
      console.log('salleId', salleId);

      const data = await api.getSellerOrder(token, salleId);
      console.log('data', data);
      const { saleDate } = data;

      const date = new Date(saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

      setOrder({ ...data, saleDate: date });
    }
    fetchOrder();
  }, []);

  const handleChangeStatus = async (status) => {
    const { id: userId, token } = getUserInfo();
    // prepara a constante oderStatusUpdated com o status recebido por parâmetro
    const oderStatusUpdated = {
      userId,
      status,
    };

    const response = await api.sendOrder(token, oderStatusUpdated);
    if (response.error === true) {
      setErrorMessage(response.message);
      return navigate('/login');
    }
  };

  return (
    <div>
      <h2>Detalhe do Pedido</h2>
      {order && order.length !== 0 && (
        <div>
          <span data-testid={ `${DATATESTID_37}` }>
            PEDIDO
            {' '}
            {order.id}
          </span>
          <span data-testid={ `${DATATESTID_39}` }>{order.saleDate}</span>
          <span data-testid={ `${DATATESTID_40}${order.id}` }>{order.status}</span>
          <button
            type="button"
            data-testid={ `${DATATESTID_47}` }
            disabled={ order.status !== 'Pendente' }
            onClick={ () => handleChangeStatus('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid={ `${DATATESTID_47}` }
            disabled={ order.status !== 'Preparando' }
            onClick={ () => handleChangeStatus('Em Trânsito') }
          >
            SAIU PARA ENTREGA
          </button>
        </div>
      )}
      <div>
        <OrderProductsTable />
      </div>
      <span>
        Total: R$
        <span data-testid={ `${DATATESTID_46}` }>
          {order.totalPrice?.replace('.', ',')}
        </span>
      </span>
    </div>
  );
}

export default OrderDetailComponent;
