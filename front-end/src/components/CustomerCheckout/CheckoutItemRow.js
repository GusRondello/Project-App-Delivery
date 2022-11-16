import React, { useContext } from 'react';
import propTypes from 'prop-types';
import CustomerContext from '../../context/CustomerContext';
import Button from '../Button';

const CUSTOMER = 'customer_checkout__';
const DATATESTID_22 = `${CUSTOMER}element-order-table-item-number-`;
const DATATESTID_23 = `${CUSTOMER}element-order-table-name-`;
const DATATESTID_24 = `${CUSTOMER}element-order-table-quantity-`;
const DATATESTID_25 = `${CUSTOMER}element-order-table-unit-price-`;
const DATATESTID_26 = `${CUSTOMER}element-order-table-sub-total-`;
const DATATESTID_27 = `${CUSTOMER}element-order-table-remove-`;

/* Responsável por renderizar os elementos do map do componente CheckoutTable */
export default function CheckoutItemRow({ product, index }) {
  const customerData = useContext(CustomerContext);
  const { productsArray, setProductsArray, setIsCartUpdated } = customerData;

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
    /* isCartUpdated é uma variável que é alterada para true quando o carrinho é atualizado,
       avisando para a aplicação atualizar os componentes que dependem do carrinho. */
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
      <td data-testid={ `${DATATESTID_26}${index}` }>{product.subtotal}</td>
      <td data-testid={ `${DATATESTID_27}${index}` } className="align-right">
        <Button type="button" onClick={ () => handleRemoveItem() }>
          Remover
        </Button>
      </td>
    </tr>
  );
}

CheckoutItemRow.propTypes = {
  product: propTypes.shape({
    id: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    price: propTypes.string.isRequired,
    subtotal: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};
