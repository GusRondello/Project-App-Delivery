import React/* , { useState, useEffect } */ from 'react';
import propTypes from 'prop-types';
import OrderItemCard from './OrderItemCard';
// import getUserInfo from '../../helpers/getUserInfo';
// import api from '../../services';

function OrderProductsTable({ products }) {
  console.log('products', products);
  // const [items, setItems] = useState([]);

  // useEffect que faz a requisição dos produtos da ordem para o back-end pela getOrderProducts enviando o id da ordem pela url
  // useEffect(() => {
  //   async function fetchOrderProducts() {
  //     const productsWithSubTotal = products.map((item) => {
  //       const { price, product } = item;
  //       const subTotal = (price * product.quantity).toFixed(2).replace('.', ',');
  //       return { ...item, subTotal };
  //     });
  //     setItems(productsWithSubTotal);
  //   }
  //   fetchOrderProducts();
  // }, []);

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
