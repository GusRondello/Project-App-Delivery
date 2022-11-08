import React from 'react';
import propTypes from 'prop-types';

const DATATESTID_58 = 'seller_order_details__element-order-table-item-number-';
const DATATESTID_59 = 'seller_order_details__element-order-table-name-';
const DATATESTID_60 = 'seller_order_details__element-order-table-quantity-';
const DATATESTID_61 = 'seller_order_details__element-order-table-unit-price-';
const DATATESTID_62 = 'seller_order_details__element-order-table-sub-total-';

function OrderItemCard({ product, index }) {
  console.log('product', product);
  return (
    <tr key={ index }>
      <td data-testid={ `${DATATESTID_58}${index}` }>{index + 1}</td>
      <td data-testid={ `${DATATESTID_59}${index}` }>{product.name}</td>
      <td data-testid={ `${DATATESTID_60}${index}` }>{product.product.quantity}</td>
      <td data-testid={ `${DATATESTID_61}${index}` }>
        {product?.price.replace('.', ',')}
      </td>
      <td data-testid={ `${DATATESTID_62}${index}` }>{(product.subTotal)}</td>
    </tr>
  );
}

OrderItemCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    subTotal: propTypes.string.isRequired,
    product: propTypes.shape({
      quantity: propTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default OrderItemCard;
