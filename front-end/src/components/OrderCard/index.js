import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FlexColumn from '../FlexColumn';

const WrapperLink = styled(FlexColumn.withComponent(Link))`
  background: ${(p) => p.theme.main};
  border-radius: 4px;
  padding: 8px;
  text-decoration: none;
  color: #f4f4f4;

  &:hover {
    color: #ffffff;
    filter: brightness(0.95);
  }
`;

/* Responsável por renderizar os elementos do map do componente OrdersComponent */
function OrderCard({ order, showAddress, routePreffix, testIdPreffix }) {
  const DATATESTID_33 = `${testIdPreffix}__element-order-id-"`;
  const DATATESTID_34 = `${testIdPreffix}__element-delivery-status-"`;
  const DATATESTID_35 = `${testIdPreffix}__element-order-date-"`;
  const DATATESTID_36 = `${testIdPreffix}__element-card-price-"`;
  const DATATESTID_52 = `${testIdPreffix}__element-card-address-`;

  return (
    <WrapperLink to={ `${routePreffix}/${order.id}` }>
      <strong>
        Pedido #
        <span data-testid={ `${DATATESTID_33}${order.id}` }>{order.id}</span>
      </strong>
      <div data-testid={ `${DATATESTID_34}${order.id}` }>{order.status}</div>
      <div data-testid={ `${DATATESTID_35}${order.id}` }>{order.saleDate}</div>
      <div data-testid={ `${DATATESTID_36}${order.id}` }>
        {order.totalPrice.replace('.', ',')}
      </div>
      {showAddress && (
        <p data-testid={ `${DATATESTID_52}${order.id}` }>
          {`${order.deliveryAddress}, ${order.deliveryNumber}`}
        </p>
      )}
    </WrapperLink>
  );
}
OrderCard.defaultProps = {
  showAddress: false,
};

OrderCard.propTypes = {
  showAddress: propTypes.bool,
  testIdPreffix: propTypes.string.isRequired,
  routePreffix: propTypes.string.isRequired,
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
