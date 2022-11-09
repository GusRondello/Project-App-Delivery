import React from 'react';
import propTypes from 'prop-types';

const DATATESTID_48 = 'seller_orders__element-order-id-';
const DATATESTID_49 = 'seller_orders__element-delivery-status-';
const DATATESTID_50 = 'seller_orders__element-order-date-';
const DATATESTID_51 = 'seller_orders__element-card-price-';
const DATATESTID_52 = 'seller_orders__element-card-address-';

/* Responsável por renderizar os elementos do map do componente OrdersComponent */
function OrderCard({ order }) {
  return (
    <div>
      <p data-testid={ `${DATATESTID_48}${order.id}` }>{order.id}</p>
      <p data-testid={ `${DATATESTID_49}${order.id}` }>{order.status}</p>
      <p data-testid={ `${DATATESTID_50}${order.id}` }>{order.saleDate}</p>
      <p data-testid={ `${DATATESTID_51}${order.id}` }>
        {order.totalPrice.replace('.', ',')}
      </p>
      <p data-testid={ `${DATATESTID_52}${order.id}` }>
        {`${order.deliveryAddress}, ${order.deliveryNumber}`}
      </p>
    </div>
  );
}

OrderCard.propTypes = {
  order: propTypes.shape({
    id: propTypes.number.isRequired,
    status: propTypes.string.isRequired,
    saleDate: propTypes.string.isRequired,
    totalPrice: propTypes.string.isRequired,
    deliveryAddress: propTypes.string.isRequired,
    deliveryNumber: propTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;
