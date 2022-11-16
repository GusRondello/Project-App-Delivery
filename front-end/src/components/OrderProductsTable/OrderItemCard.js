import React from 'react';
import propTypes from 'prop-types';

/* Responsável por renderizar os elementos do map do componente OrderProductsTable */
function OrderItemCard({ product, index, testIdPreffix }) {
  const {
    name,
    product: { quantity },
    price: priceString,
  } = product;

  const price = Number(priceString);

  const DATATESTID_41 = `${testIdPreffix}__element-order-table-item-number-`;
  const DATATESTID_42 = `${testIdPreffix}__element-order-table-name-`;
  const DATATESTID_43 = `${testIdPreffix}__element-order-table-quantity-`;
  const DATATESTID_44 = `${testIdPreffix}__element-order-table-unit-price-`;
  const DATATESTID_45 = `${testIdPreffix}__element-order-table-sub-total-`;

  return (
    <tr>
      <td data-testid={ `${DATATESTID_41}${index}` }>{index}</td>
      <td data-testid={ `${DATATESTID_42}${index}` }>{name}</td>
      <td data-testid={ `${DATATESTID_43}${index}` }>{quantity}</td>
      <td data-testid={ `${DATATESTID_44}${index}` }>
        {price.toFixed(2).replace('.', ',')}
      </td>
      <td data-testid={ `${DATATESTID_45}${index}` }>
        {(price * quantity).toFixed(2).replace('.', ',')}
      </td>
    </tr>
  );
}

OrderItemCard.propTypes = {
  index: propTypes.number.isRequired,
  testIdPreffix: propTypes.string.isRequired,
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    product: propTypes.shape({
      quantity: propTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default OrderItemCard;
