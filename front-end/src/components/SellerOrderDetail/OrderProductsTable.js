import React from 'react';
import propTypes from 'prop-types';
import OrderItemCard from './OrderItemCard';

function OrderProductsTable({ products }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Percorre o array de items e renderiza cada item em uma linha da tabela */}
          {products?.map((product, index) => (
            <OrderItemCard
              key={ product.id }
              product={ product }
              index={ index }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

OrderProductsTable.propTypes = {
  products: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number,
    name: propTypes.string,
    price: propTypes.string,
    quantity: propTypes.number,
    subTotal: propTypes.string,
  })).isRequired,
};

export default OrderProductsTable;
