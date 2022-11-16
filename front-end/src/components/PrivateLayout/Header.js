import React from 'react';
import styled from 'styled-components';
import getUserInfo from '../../helpers/getUserInfo';
import ThemeComponent from '../ThemeComponent';
import { NavLinkButton } from '../Button';

const Wrapper = styled.div`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  column-gap: 16px;
  align-items: center;
  justify-content: center;
  background-color: var(--tertiary);

  #name {
    margin-left: auto;
  }
`;

/* Header é um componente que renderiza o header da aplicação, que é o mesmo para todos os usuários.
   Ele renderiza o nome do usuário e o botão de logout, além de renderizar os botões de navegação
   relacionados ao usuário logado. */

export default function Header() {
  /* Recebe do localStorage o nome e o role do usuário logado */
  const { name, role } = getUserInfo();

  return (
    <Wrapper>
      {role === 'customer' && (
        <>
          <NavLinkButton
            data-testid="customer_products__element-navbar-link-products"
            to="/customer/products"
          >
            Produtos
          </NavLinkButton>
          <NavLinkButton
            data-testid="customer_products__element-navbar-link-orders"
            to="/customer/orders"
          >
            Meus Pedidos
          </NavLinkButton>
        </>
      )}
      {role === 'seller' && (
        <NavLinkButton
          data-testid="customer_products__element-navbar-link-orders"
          to="/seller/orders"
        >
          Pedidos
        </NavLinkButton>
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
      <ThemeComponent />
      <NavLinkButton
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => localStorage.removeItem('user') }
        to="/login"
      >
        Sair
      </NavLinkButton>
    </Wrapper>
  );
}
