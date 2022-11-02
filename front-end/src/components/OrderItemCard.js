import React from 'react';
import propTypes from 'prop-types';

const CUSTOMER = 'customer_order_details__';
const DATATESTID_41 = `${CUSTOMER}element-order-table-item-number-`;
const DATATESTID_42 = `${CUSTOMER}element-order-table-name-`;
const DATATESTID_43 = `${CUSTOMER}element-order-table-quantity-`;
const DATATESTID_44 = `${CUSTOMER}element-order-table-unit-price-`;
const DATATESTID_45 = `${CUSTOMER}element-order-table-sub-total-`;

function OrderItemCard({ product, index }) {
  return (
    <tr key={ index }>
      <td data-testid={ `${DATATESTID_41}${index}` }>{index + 1}</td>
      <td data-testid={ `${DATATESTID_42}${index}` }>{product.name}</td>
      <td data-testid={ `${DATATESTID_43}${index}` }>{product.quantity}</td>
      <td data-testid={ `${DATATESTID_44}${index}` }>
        {product.price.replace('.', ',')}
      </td>
      <td data-testid={ `${DATATESTID_45}${index}` }>{(product.subtotal)}</td>
    </tr>
  );
}

OrderItemCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    subtotal: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default OrderItemCard;
