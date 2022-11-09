import React from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../helpers/getUserInfo';

/* Header é um componente que renderiza o header da aplicação, que é o mesmo para todos os usuários.
   Ele renderiza o nome do usuário e o botão de logout, além de renderizar os botões de navegação
   relacionados ao usuário logado. */
function Header() {
  /* Recebe do localStorage o nome e o role do usuário logado */
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
          <p data-testid="customer_products__element-navbar-link-orders">
            Gerenciar Usuários
          </p>
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
