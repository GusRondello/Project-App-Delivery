// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';
// import getTotalPrice from '../helpers/getTotalPrice';
// import getCartItems from '../helpers/getCartItems';
// import CartItemCard from './CartItemCard';
import { sendOrder, getSalle } from '../services';
import GetUserInfo from '../helpers/getUserInfo';

const sellers = [
  {
    id: 1,
    name: 'Sandra',
  },
  {
    id: 2,
    name: 'Maria',
  },
];

function SalleDetailComponent() {
  const [items, setItems] = useState([]);
  const { cartItems } = useContext(CustomerContext);
  const [salleX, setSalle] = useState([]);

  // const { state: { salle } } = useLocation();

  const navigate = useNavigate();
  // const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  console.log('items', items);
  console.log('salle', salleX);

  // useEffect responsável por receber os dados da salle da api
  useEffect(() => {
    async function fetchSalle() {
      const { token } = GetUserInfo();
      const salleId = window.location.pathname.split('/')[3];
      console.log('salleId', salleId);
      // retorna em uma const error e sale
      const data = await getSalle(token, salleId);
      // if (data === error) {
      //   console.log('error', error);
      //   // localStorage.removeItem('user');
      //   return/*  navigate('/login') */;
      // }
      console.log('data', data);
      setSalle(data);
    }
    fetchSalle();
  }, []);

  const handleChangeStatus = async () => {
    const { id: userId, token } = GetUserInfo();
    const oderStatusUpdated = {
      userId,
      status: 'Entregue',
    };

    const response = await sendOrder(token, oderStatusUpdated);
    if (response.error === true) {
      setErrorMessage(response.message);
      return navigate('/login');
    }
  };

  return (
    <div>
      <h2>Detalhe do Pedido</h2>
      Renderiza os dados apenas se salle não for um array vazio
      {salleX && salleX.length !== 0 && (
        <div>
          {/* Componente que possui como informações: PEDIDO nº do pedido,
       P. Vend: nome do vendedor, data do pedido, Status do pedido,
       Botão para marcar como entregue */}
          <span>
            PEDIDO
            {' '}
            {salleX.id}
          </span>
          <span>
            P. Vend:
            {' '}
            {/* compara o id do vendedor em salleX com o id do vendedor em sellers */}
            {sellers.find((seller) => seller.id === salleX.sellerId).name}
          </span>
          <span>{salleX.saleDate}</span>
          <span>{salleX.status}</span>
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            onClick={ () => handleChangeStatus() }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      )}
      {/* <div>
        <div>
          {items?.map((product, index) => (
            <div key={ product.id }>
              <CartItemCard product={ product } index={ index } />
            </div>
          ))}
        </div>
        <p data-testid="customer_checkout__element-order-total-price">
          Total:
          {` R$ ${totalPrice}`}
        </p>
      </div> */}
    </div>
  );
}

export default SalleDetailComponent;
