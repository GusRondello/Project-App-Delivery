import React, { useContext, useEffect, useState } from 'react';
import DetailItemCard from './DetailItemCard';
import CustomerContext from '../context/CustomerContext';

function DetailsTable() {
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
          </tr>
        </thead>
        <tbody>
          {/* Percorre o array de items e renderiza cada item em uma linha da tabela */}
          {items.map((item, index) => (
            <DetailItemCard
              key={ index }
              product={ item }
              index={ index }
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailsTable;
