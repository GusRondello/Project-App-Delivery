import React, { /* useContext,  */useEffect, useState } from 'react';
import OrderItemCard from './OrderItemCard';
// import CustomerContext from '../../context/CustomerContext';
import getUserInfo from '../../helpers/getUserInfo';
import { getSellerOrder as getOrderProducts } from '../../services';

function OrderProductsTable() {
  const [items, setItems] = useState([]);
  // const { cartItems } = useContext(CustomerContext);

  // useEffect(() => {
  //   setItems(cartItems);
  // }, [cartItems]);

  // useEffect que faz a requisição dos produtos da ordem para o back-end pela getOrderProducts enviando o id da ordem pela url
  useEffect(() => {
    async function fetchOrderProducts() {
      const { token } = getUserInfo();
      const salleId = window.location.pathname.split('/')[3];
      const { products } = await getOrderProducts(token, salleId);
      setItems(products);
    }
    fetchOrderProducts();
  }, []);

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
          {items?.map((product, index) => (
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

export default OrderProductsTable;
