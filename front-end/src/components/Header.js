import React from 'react';
import { useNavigate } from 'react-router-dom';
// import DeliveryContext from '../context/DeliveryContext ';
import getUserInfo from '../helpers/getUserInfo';
// import saveUserInfo from '../helpers/saveUserInfo';

function Header() {
  // const { customerName } = React.useContext(DeliveryContext);
  const { name, role } = getUserInfo();

  const navigate = useNavigate();

  return (
    <div>
      {role === 'customer'
      && (
        <div>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => navigate('/customer/products') }
          >
            Produtos
          </button>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/customer/orders') }
          >
            Meus Pedidos
          </button>
        </div>
      )}
      {role === 'seller'
      && (
        <div>
          <button
            type="button"
            data-testid="xablau/* seller_orders__element-navbar-link-orders */"
            onClick={ () => navigate('/seller/orders') }
          >
            Pedidos
          </button>
        </div>
      )}
      <div>
        <p data-testid="customer_products__element-navbar-user-full-name">
          { name }
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            // localStorage.clear();
            localStorage.removeItem('user');
            // saveUserInfo({});
            navigate('/login');
          } }
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default Header;
