import React from 'react';
import { useNavigate } from 'react-router-dom';
// import DeliveryContext from '../context/DeliveryContext ';
import getUserInfo from '../helpers/getUserInfo';

function HeaderCustomer() {
  // const { customerName } = React.useContext(DeliveryContext);
  const { name: customerName } = getUserInfo();

  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigate('/customer/products') }
        >
          Produtos
        </button>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigate('/customer/orders') }
        >
          Meus Pedidos
        </button>
      </div>
      <div>
        <p data-testid="customer_products__element-navbar-user-full-name">
          { customerName }
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => logout() }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default HeaderCustomer;
