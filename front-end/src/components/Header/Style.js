import styled from 'styled-components';

const HeaderS = styled.div`
  border: 1px solid green;
  height: 60px;
  width: 100%;
  // cria um grid com 1 linha e 4 colunas
  display: grid;
  grid-template-columns: 200px 200px 1fr 200px 75px;
  grid-template-rows: 1fr;
  grid-template-areas: 'btn1 btn2 space n btn3';
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--buttonBackground);
  #customerBtns {
    display: flex;
    width: 400px;
    height: 100%;
  }
  #btn1 {
    grid-area: btn1;
    border: 1px solid var(--buttonBorder);
    // se o patchname for /customer/products ou /seller/orders ou /admin/manage deixa com
    // cor secundária, senão deixa com cor terciária
    background-color: ${({ location }) => ((location === '/customer/products'
    || location === '/customer/checkout'
    || location === '/seller/orders'
    || location === '/admin/manage')
    ? 'var(--secundary)' : 'var(--buttonBackground)')};
    height: 100%;
    width: 100%;
  }
  #btn2 {
    grid-area: btn2;
    border: 1px solid var(--buttonBorder);
    background-color: ${({ location }) => ((location === '/customer/orders')
    ? 'var(--secundary)' : 'var(--buttonBackground)')};
    height: 100%;
    width: 100%;
  }
  #name {
    grid-area: n;
    border: 1px solid var(--buttonBorder);
    background-color: var(--extra);
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  #logouAndThemeDiv {
    border: 1px solid var(--buttonBorder);
    background-color: var(--main);
    grid-area: btn3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    #leaveBtn {
      height: 100%;
      width: 100%;
      // tira a estilização de botão do elemento
      background: none;
      border: none;
    }
  }
`;

export default HeaderS;
