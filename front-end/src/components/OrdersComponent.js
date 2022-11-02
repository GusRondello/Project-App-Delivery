import React, { useEffect, useState/* , useContext */ } from 'react';
// import { useNavigate } from 'react-router-dom';
// import CustomerContext from '../context/CustomerContext';
// import getTotalPrice from '../helpers/getTotalPrice';
// import DetailItemCard from './DetailItemCard';
import { getAllOrders } from '../services';
import GetUserInfo from '../helpers/getUserInfo';
import OrderCard from './OrderCard';

// const CUSTOMER = 'customer_order_details__';
// const DATATESTID_37 = `${CUSTOMER}element-order-details-label-order-id`;
// const DATATESTID_38 = `${CUSTOMER}element-order-details-label-seller-name`;
// const DATATESTID_39 = `${CUSTOMER}element-order-details-label-order-date`;
// const DATATESTID_40 = `${CUSTOMER}element-order-details-label-delivery-status`;
// const DATATESTID_46 = `${CUSTOMER}element-order-total-price`;
// const DATATESTID_47 = `${CUSTOMER}button-delivery-check`;

function OrdersComponent() {
  // const [items, setItems] = useState([]);
  // const { cartItems } = useContext(CustomerContext);
  const [orders, setOrders] = useState([]);

  // const navigate = useNavigate();
  // const totalPrice = getTotalPrice();
  // console.log('totalPrice', totalPrice);
  // useEffect(() => {
  //   setItems(cartItems);
  // }, [cartItems]);

  // useEffect responsável por receber as orders da api
  useEffect(() => {
    async function fetchSalle() {
      const { token } = GetUserInfo();
      const data = await getAllOrders(token);
      console.log('data', data);

      setOrders(data);
    }
    fetchSalle();
  }, []);

  return (
    <div>
      {orders && orders.length !== 0 && (
        // Faz um map de orders chamando o componente OrderCard
        orders.map((order) => (
          <div key={ order.id }>
            <OrderCard order={ order } />
          </div>
        ))
      )}
    </div>
  );
}

export default OrdersComponent;
