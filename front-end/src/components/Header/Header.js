import React from 'react';
import { useNavigate } from 'react-router-dom';
import getUserInfo from '../../helpers/getUserInfo';
import ThemeComponent from '../ThemeComponent';
import HeaderS from './Style';

/* Header é um componente que renderiza o header da aplicação, que é o mesmo para todos os usuários.
   Ele renderiza o nome do usuário e o botão de logout, além de renderizar os botões de navegação
   relacionados ao usuário logado. */
function Header() {
  /* Recebe do localStorage o nome e o role do usuário logado */
  const { name, role } = getUserInfo();

  const navigate = useNavigate();

  return (
    <HeaderS>
      {role === 'customer' && (
        <div id="customerBtns">
          <button
            id="btn1"
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => navigate('/customer/products') }
          >
            Produtos
          </button>
          <button
            id="btn2"
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
            id="btn1"
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => navigate('/seller/orders') }
          >
            Pedidos
          </button>
        </div>
      )}
      {role === 'administrator' && (
        <div id="btn1">
          <p data-testid="customer_products__element-navbar-link-orders">
            Gerenciar Usuários
          </p>
        </div>
      )}
      <div id="name">
        <p data-testid="customer_products__element-navbar-user-full-name">
          {name}
        </p>
      </div>
      <div id="logouAndThemeDiv">
        <button
          id="leaveBtn"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
            navigate('/login');
          } }
        >
          Sair
        </button>
        <div>
          <ThemeComponent />
        </div>
      </div>
    </HeaderS>
  );
}

export default Header;
