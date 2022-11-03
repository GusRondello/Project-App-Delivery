// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import DetailItemCard from './DetailItemCard';
import { sendOrderStatusUpdate, getSellerOrder } from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderProductsTable from './OrderProductsTable';

const DATATESTID_53 = 'seller_order_details__element-order-details-label-order-id';
const DATATESTID_54 = 'seller_order_details__element-order-details-label-delivery-status';
const DATATESTID_55 = 'seller_order_details__element-order-details-label-order-date';
const DATATESTID_56 = 'seller_order_details__button-preparing-check';
const DATATESTID_57 = 'seller_order_details__button-dispatch-check';
const DATATESTID_63 = 'seller_order_details__element-order-total-price';

function OrderDetailComponent() {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');

  const navigate = useNavigate();

  // useEffect responsável por receber os detales da order da api
  useEffect(() => {
    async function fetchOrder() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];

      const data = await getSellerOrder(token, salleId);
      // console.log('data', data);
      const { saleDate } = data;

      const date = new Date(saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

      setOrder({ ...data, saleDate: date });
      setOrderStatus(data.status);
    }
    fetchOrder();
  }, []);

  const handleChangeStatus = async (status) => {
    console.log('status', status);
    const { token } = getUserInfo();
    const salleId = window.location.pathname.split('/')[3];
    const oderStatusUpdated = {
      status,
    };

    const response = await sendOrderStatusUpdate(token, oderStatusUpdated, salleId);
    console.log('response', response);
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
          <span data-testid={ `${DATATESTID_53}` }>
            PEDIDO
            {' '}
            {order.id}
          </span>
          <span data-testid={ `${DATATESTID_55}` }>{order.saleDate}</span>
          <span data-testid={ `${DATATESTID_54}${order.id}` }>{order.status}</span>
          <button
            type="button"
            data-testid={ `${DATATESTID_56}` }
            disabled={ orderStatus !== 'Pendente' }
            onClick={ () => handleChangeStatus('Preparando') }
            // value={ orderStatus }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid={ `${DATATESTID_57}` }
            disabled={ orderStatus !== 'Preparando' }
            onClick={ () => handleChangeStatus('Em Trânsito') }
            // value={ orderStatus }
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
        <span data-testid={ `${DATATESTID_63}` }>
          {order.totalPrice?.replace('.', ',')}
        </span>
      </span>
    </div>
  );
}

export default OrderDetailComponent;
