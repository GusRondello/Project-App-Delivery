import React from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../helpers/getUserInfo';

function Header() {
  const { name, role } = getUserInfo();

  const navigate = useNavigate();

  return (
    <div>
      {role === 'customer' && (
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
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/seller/orders') }
          >
            Pedidos
          </button>
        </div>
      )}
      {role === 'administrator' && (
        <div>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/admin/manage') }
          >
            Gerenciar Usuários
          </button>
        </div>
      )}
      <div>
        <p data-testid="customer_products__element-navbar-user-full-name">
          {name}
        </p>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
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
