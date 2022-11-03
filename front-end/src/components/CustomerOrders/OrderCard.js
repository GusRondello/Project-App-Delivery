import React from 'react';
import propTypes from 'prop-types';

const DATATESTID_33 = 'customer_orders__element-order-id-';
const DATATESTID_34 = 'customer_orders__element-delivery-status-';
const DATATESTID_35 = 'customer_orders__element-order-date-';
const DATATESTID_36 = 'customer_orders__element-card-price-';

function OrderCard({ order }) {
  return (
    <div>
      <p data-testid={ `${DATATESTID_33}${order.id}` }>{order.id}</p>
      <p data-testid={ `${DATATESTID_34}${order.id}` }>{order.status}</p>
      <p data-testid={ `${DATATESTID_35}${order.id}` }>{order.saleDate}</p>
      <p data-testid={ `${DATATESTID_36}${order.id}` }>
        {order.totalPrice.replace('.', ',')}
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
  }).isRequired,
};

export default OrderCard;
