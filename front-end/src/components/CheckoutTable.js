import React, { useContext, useEffect, useState } from 'react';
import CustomerContext from '../context/CustomerContext';
import CheckoutItemCard from './CheckoutItemCard';

function CheckoutProductsTable() {
  const [items, setItems] = useState([]);
  const { cartItems } = useContext(CustomerContext);

  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

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
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {/* Percorre o array de items e renderiza cada item em uma linha da tabela */}
          {items.map((product, index) => (
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
