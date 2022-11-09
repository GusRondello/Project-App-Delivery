import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../../context/CustomerContext';

const CUSTOMER = 'customer_checkout__';
const DATATESTID_22 = `${CUSTOMER}element-order-table-item-number-`;
const DATATESTID_23 = `${CUSTOMER}element-order-table-name-`;
const DATATESTID_24 = `${CUSTOMER}element-order-table-quantity-`;
const DATATESTID_25 = `${CUSTOMER}element-order-table-unit-price-`;
const DATATESTID_26 = `${CUSTOMER}element-order-table-sub-total-`;
const DATATESTID_27 = `${CUSTOMER}element-order-table-remove-`;

function OrderItemCard({ product, index }) {
  const { productsArray, setProductsArray,
    setIsCartUpdated } = useContext(CustomerContext);

  /* Função responsável por deletar o produto do carrinho e enviar o novo array de produtos para o context.
     Também isCartUpdated como true */
  const handleRemoveItem = () => {
    const newProductsQtd = productsArray.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: 0 };
      }
      return item;
    });
    setProductsArray(newProductsQtd);
    setIsCartUpdated(true);
  };

  return (
    <tr key={ index }>
      <td data-testid={ `${DATATESTID_22}${index}` }>{index + 1}</td>
      <td data-testid={ `${DATATESTID_23}${index}` }>{product.name}</td>
      <td data-testid={ `${DATATESTID_24}${index}` }>{product.quantity}</td>
      <td data-testid={ `${DATATESTID_25}${index}` }>
        {product.price.replace('.', ',')}
      </td>
      <td data-testid={ `${DATATESTID_26}${index}` }>{(product.subtotal)}</td>
      <td data-testid={ `${DATATESTID_27}${index}` }>
        <button
          type="button"
          onClick={ () => handleRemoveItem() }
        >
          Remover
        </button>
      </td>
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
