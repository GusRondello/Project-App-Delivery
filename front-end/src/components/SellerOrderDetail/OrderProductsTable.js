import React, { /* useContext,  */useEffect, useState } from 'react';
import OrderItemCard from './OrderItemCard';
// import CustomerContext from '../../context/CustomerContext';
import getUserInfo from '../../helpers/getUserInfo';
import api from '../../services';

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
      const { products } = await api.getSellerOrder(token, salleId);
      // console.log('products', products);

      const productsWithSubTotal = products.map((item) => {
        const { price, product } = item;
        const subTotal = (price * product.quantity).toFixed(2).replace('.', ',');
        return { ...item, subTotal };
      });
      setItems(productsWithSubTotal);
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
