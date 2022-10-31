import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../context/CustomerContext';

function CartItemCard({ product, index }) {
  const { productsArray, setProductsArray,
    setIsCartUpdated } = useContext(CustomerContext);

  const handleRemoveItem = () => {
    const newProductsQtd = productsArray.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setProductsArray(newProductsQtd);
    setIsCartUpdated(true);

    // window.location.reload();
  };

  return (
    <div>
      {/* {console.log(product)} */}
      <p
        data-testid={ `customer_checkout__element
      -order-table-item-number-${product.id}` }
      >
        {index + 1}
      </p>
      <p data-testid={ `customer_checkout__element-order-table-name-${product.id}` }>
        {product.name}
      </p>
      <p data-testid={ `customer_checkout__element-order-table-quantity-${product.id}` }>
        {product.quantity}
      </p>
      <p
        data-testid={ `customer_checkout__element-order
      -table-unit-price-${product.id}` }
      >
        {product.price}
      </p>
      <p data-testid={ `customer_checkout__element-order-table-sub-total-${product.id}` }>
        {Number(product.subtotal)}
      </p>

      {/* Botão para remover o item, ao ser clicado percorre productsArray e atualiza a quantidade */}
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${product.id}` }
        onClick={ () => handleRemoveItem() }
      >
        Remover
      </button>
    </div>
  );
}

CartItemCard.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    subtotal: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default CartItemCard;
