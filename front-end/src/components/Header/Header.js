import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';
import getUserInfo from '../../helpers/getUserInfo';
import ThemeComponent from '../ThemeComponent';
import HeaderS from './Style';

/* Header é um componente que renderiza o header da aplicação, que é o mesmo para todos os usuários.
   Ele renderiza o nome do usuário e o botão de logout, além de renderizar os botões de navegação
   relacionados ao usuário logado. */
function Header({ location }) {
  /* Recebe do localStorage o nome e o role do usuário logado */
  const { name, role } = getUserInfo();

  const navigate = useNavigate();
  console.log('location', location);

  return (
    <HeaderS location={ location }>
      {role === 'customer' && (
        <>
          <NavLink
            className="header-button"
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </NavLink>
          <NavLink
            className="header-button"
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            Meus Pedidos
          </NavLink>
        </>
      )}
      {role === 'seller'
      && (
        <NavLink
          className="header-button"
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos
        </NavLink>
      )}
      {role === 'administrator' && (
        <div>
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
      <NavLink
        className="header-button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => {
          localStorage.removeItem('user');
        } }
        to="/login"
      >
        Sair
      </NavLink>
      <ThemeComponent
        className="header-button"
      />
    </HeaderS>
  );
}

Header.propTypes = {
  location: propTypes.string.isRequired,
};

export default Header;
