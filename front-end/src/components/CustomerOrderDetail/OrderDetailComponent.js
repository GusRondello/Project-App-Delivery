// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../../context/CustomerContext';
import DeliveryContext from '../../context/DeliveryContext ';
// import DetailItemCard from './DetailItemCard';
import { getCustomerOrder, updateOrderStatus } from '../../services/apiAppDelivery';
import getUserInfo from '../../helpers/getUserInfo';
import OrderProductsTable from './OrderProductsTable';

const CUSTOMER = 'customer_order_details__';
const DATATESTID_37 = `${CUSTOMER}element-order-details-label-order-id`;
const DATATESTID_38 = `${CUSTOMER}element-order-details-label-seller-name`;
const DATATESTID_39 = `${CUSTOMER}element-order-details-label-order-date`;
const DATATESTID_40 = `${CUSTOMER}element-order-details-label-delivery-status`;
const DATATESTID_46 = `${CUSTOMER}element-order-total-price`;
const DATATESTID_47 = `${CUSTOMER}button-delivery-check`;

function OrderDetailComponent() {
  const [orderStatus, setOrderStatus] = useState('');
  const [sellersArray, setSellersArray] = useState([]);
  const [order, setOrder] = useState([]);
  const { sellers } = useContext(CustomerContext);
  const { isStatusUpdated, setIsStatusUpdated } = useContext(DeliveryContext);

  // const { state: { salle } } = useLocation();

  const navigate = useNavigate();
  console.log('orderStatus', orderStatus);
  useEffect(() => {
    setSellersArray(sellers);
  }, [sellers]);

  // useEffect responsável por receber os detales da order da api
  useEffect(() => {
    async function fetchOrder() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];

      const data = await getCustomerOrder(token, salleId);
      console.log('data', data);
      const { saleDate } = data;

      const date = new Date(saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).split(' ')[0];

      setOrder({ ...data, saleDate: date });
      setOrderStatus(data.status);
      setIsStatusUpdated(false);
    }
    fetchOrder();
  }, [isStatusUpdated]);

  const handleChangeStatus = async () => {
    const { token } = getUserInfo();
    // const { id } = order.id;
    const salleId = window.location.pathname.split('/')[3];
    const oderStatusUpdated = {
      status: 'Entregue',
    };

    const response = await updateOrderStatus(token, oderStatusUpdated, salleId);
    setIsStatusUpdated(true);
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
          <span data-testid={ `${DATATESTID_37}` }>
            PEDIDO
            {' '}
            {order.id}
          </span>
          <span>
            P. Vend:
            {' '}
            {/* compara o id do vendedor em order com o id do vendedor em sellers */}
            <p data-testid={ `${DATATESTID_38}` }>
              {sellersArray.find((seller) => seller.id === order.sellerId)?.name}
            </p>
          </span>
          <span data-testid={ `${DATATESTID_39}` }>{order.saleDate}</span>
          <span data-testid={ `${DATATESTID_40}${order.id}` }>{order.status}</span>
          <button
            type="button"
            data-testid={ `${DATATESTID_47}` }
            disabled={ orderStatus !== 'Em Trânsito' }
            onClick={ () => handleChangeStatus() }
          >
            MARCAR COMO ENTREGUE
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
