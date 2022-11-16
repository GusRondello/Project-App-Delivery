import React, { useContext } from 'react';
import Table from '../Table';
import OrderItemCard from './OrderItemCard';
import CustomerContext from '../../context/CustomerContext';

function OrderProductsTable() {
  const { cartItems } = useContext(CustomerContext);

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
        {cartItems?.map((product, index) => (
          <OrderItemCard key={ product.id } product={ product } index={ index } />
        ))}
      </tbody>
    </Table>
  );
}

export default OrderProductsTable;
