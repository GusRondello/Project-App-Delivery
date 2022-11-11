import React, { useContext } from 'react';
import CustomerContext from '../../context/CustomerContext';
import CheckoutItemCard from './CheckoutItemCard';

function CheckoutProductsTable() {
  const { cartItems } = useContext(CustomerContext);

  return (
    <div>
      <table id="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub Total</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {/* Percorre o array de items e renderiza cada item em uma linha da tabela */}
          {cartItems?.map((product, index) => (
            <CheckoutItemCard
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

export default CheckoutProductsTable;
