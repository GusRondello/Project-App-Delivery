import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services';
import getUserInfo from '../../helpers/getUserInfo';
import OrderProductsTable from './OrderProductsTable';
import DeliveryContext from '../../context/DeliveryContext';

const DATATESTID_53 = 'seller_order_details__element-order-details-label-order-id';
const DATATESTID_54 = 'seller_order_details__element-order-details-label-delivery-status';
const DATATESTID_55 = 'seller_order_details__element-order-details-label-order-date';
const DATATESTID_56 = 'seller_order_details__button-preparing-check';
const DATATESTID_57 = 'seller_order_details__button-dispatch-check';
const DATATESTID_63 = 'seller_order_details__element-order-total-price';

function OrderDetailComponent() {
  const [order, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const { isStatusUpdated, setIsStatusUpdated } = useContext(DeliveryContext);

  const navigate = useNavigate();

  /* useEffect para receber da API (api.getSellerOrder) a order relacionada ao id da URL.
      É chamado novamente caso o status da order seja atualizado */
  useEffect(() => {
    async function fetchOrder() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];

      const data = await api.getSellerOrder(token, salleId);
      const { saleDate, products } = data;

      /* Converte a data para o formato dd/mm/yyyy e com o timezone brasileiro */
      const date = new Date(saleDate)
        .toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        .split(' ')[0];

      const productsWithSubTotal = products.map((item) => {
        const {
          price,
          product: { quantity },
        } = item;
        const subTotal = (price * quantity).toFixed(2).replace('.', ',');
        return { ...item, subTotal };
      });

      setOrder({ ...data, products: productsWithSubTotal, saleDate: date });
      setOrderStatus(data.status);
      /* isStatusUpdated é uma variável que é alterada para false quando a API é chamada,
         preparando o contexto para receber a pŕoxima atualização do status. */
      setIsStatusUpdated(false);
    }
    fetchOrder();
  }, [isStatusUpdated]);

  /* Função responsável por atualizar o status da order para "Preparando" ou "Em Trânsito"
     na API (api.sendOrderStatusUpdate) */
  const handleChangeStatus = async (status) => {
    const { token } = getUserInfo();
    const salleId = window.location.pathname.split('/')[3];
    const oderStatusUpdated = {
      status,
    };

    const response = await api.sendOrderStatusUpdate(
      token,
      oderStatusUpdated,
      salleId,
    );
    /* isStatusUpdated é uma variável que é alterada para false quando a API é chamada,
       preparando o contexto para receber a pŕoxima atualização do status. */
    setIsStatusUpdated(true);

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
            {order.id}
          </span>
          <span data-testid={ `${DATATESTID_55}` }>{order.saleDate}</span>
          <span data-testid={ `${DATATESTID_54}${order.id}` }>
            {order.status}
          </span>
          <button
            type="button"
            data-testid={ `${DATATESTID_56}` }
            disabled={ orderStatus !== 'Pendente' }
            onClick={ () => handleChangeStatus('Preparando') }
          >
            PREPARAR PEDIDO
          </button>
          <button
            type="button"
            data-testid={ `${DATATESTID_57}` }
            disabled={ orderStatus !== 'Preparando' }
            onClick={ () => handleChangeStatus('Em Trânsito') }
          >
            SAIU PARA ENTREGA
          </button>
          <div>
            <OrderProductsTable products={ order?.products } />
          </div>
        </div>
      )}
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
