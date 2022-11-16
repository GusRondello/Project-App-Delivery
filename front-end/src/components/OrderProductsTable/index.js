import React from 'react';
import propTypes from 'prop-types';
import Table from '../Table';
import OrderItemCard from './OrderItemCard';

export default function OrderProductsTable({ products, testIdPreffix }) {
  return (
    <Table>
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
            index={ index + 1 }
            product={ product }
            testIdPreffix={ testIdPreffix }
          />
        ))}
      </tbody>
    </Table>
  );
}

OrderProductsTable.propTypes = {
  testIdPreffix: propTypes.string.isRequired,
  products: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      price: propTypes.string.isRequired,
      product: propTypes.shape({
        quantity: propTypes.number.isRequired,
      }).isRequired,
    }),
  ).isRequired,
};
