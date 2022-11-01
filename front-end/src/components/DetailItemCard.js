import React from 'react';
import propTypes from 'prop-types';

function DetailItemCard({ product, index }) {
  return (
    <div>
      {/* {console.log(product)} */}
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </p>
      <p data-testid={ `customer_checkout__element-order-table-name-${index}` }>
        {product.name}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {product.quantity}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        {product.price.replace('.', ',')}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {(product.subtotal)}
      </p>
    </div>
  );
}

DetailItemCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    subtotal: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default DetailItemCard;
