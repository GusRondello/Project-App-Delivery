import React, { useContext } from 'react';
import CustomerContext from '../../context/CustomerContext';
import Table from '../Table';
import CheckoutItemRow from './CheckoutItemRow';

function CheckoutProductsTable() {
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
          <th className="align-right">Remover Item</th>
        </tr>
      </thead>
      <tbody>
        {/* Percorre o array de items e renderiza cada item em uma linha da tabela */}
        {cartItems?.map((product, index) => (
          <CheckoutItemRow key={ product.id } product={ product } index={ index } />
        ))}
      </tbody>
    </Table>
  );
}

export default CheckoutProductsTable;
