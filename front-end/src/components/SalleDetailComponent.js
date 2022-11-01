// Cria um componente que recebe os produtos do banco de dados e os renderiza na tela
import React, { useEffect, useState/* , useContext */ } from 'react';
import { useNavigate } from 'react-router-dom';
// import CustomerContext from '../context/CustomerContext';
import getTotalPrice from '../helpers/getTotalPrice';
// import DetailItemCard from './DetailItemCard';
import { sendOrder, getSalle } from '../services';
import GetUserInfo from '../helpers/getUserInfo';
import DetailsTable from './DetailsTable';

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

const CUSTOMER = 'customer_order_details__';
const DATATESTID_37 = `${CUSTOMER}element-order-details-label-order-id`;
const DATATESTID_38 = `${CUSTOMER}element-order-details-label-seller-name`;
const DATATESTID_39 = `${CUSTOMER}element-order-details-label-order-date`;
const DATATESTID_40 = `${CUSTOMER}element-order-details-label-delivery-status`;
const DATATESTID_46 = `${CUSTOMER}element-order-total-price`;
const DATATESTID_47 = `${CUSTOMER}button-delivery-check`;

function SalleDetailComponent() {
  // const [items, setItems] = useState([]);
  // const { cartItems } = useContext(CustomerContext);
  const [salle, setSalle] = useState([]);

  // const { state: { salle } } = useLocation();

  const navigate = useNavigate();
  const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  // useEffect(() => {
  //   setItems(cartItems);
  // }, [cartItems]);

  // useEffect responsável por receber os dados da salle da api
  useEffect(() => {
    async function fetchSalle() {
      const { token } = GetUserInfo();
      const salleId = window.location.pathname.split('/')[3];
      // console.log('salleId', salleId);
      // retorna em uma const error e sale
      const data = await getSalle(token, salleId);
      // console.log('data', data);
      // if (data.error) {
      //   localStorage.removeItem('user');
      //   return navigate('/login');
      // }
      const { saleDate } = data;
      const saleDateFormatted = saleDate.split('T')[0].split('-').reverse().join('/');

      setSalle({ ...data, saleDate: saleDateFormatted });
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
      {salle && salle.length !== 0 && (
        <div>
          <span data-testid={ `${DATATESTID_37}` }>
            PEDIDO
            {' '}
            {salle.id}
          </span>
          <span data-testid={ `${DATATESTID_38}` }>
            P. Vend:
            {' '}
            {/* compara o id do vendedor em salle com o id do vendedor em sellers */}
            {sellers.find((seller) => seller.id === salle.sellerId).name}
          </span>
          <span data-testid={ `${DATATESTID_39}` }>{salle.saleDate}</span>
          <span data-testid={ `${DATATESTID_40}${salle.id}` }>{salle.status}</span>
          <button
            type="button"
            data-testid={ `${DATATESTID_47}` }
            onClick={ () => handleChangeStatus() }
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
      )}
      <div>
        {/* Cria uma tabela com o cabeçalho contendo: Item, Descrição, Quantidade, Valor Unitário e Sub Total */}
        <DetailsTable />
      </div>
      <p data-testid={ `${DATATESTID_46}` }>
        Total:
        {` R$ ${totalPrice}`}
      </p>
    </div>
  );
}

export default SalleDetailComponent;
