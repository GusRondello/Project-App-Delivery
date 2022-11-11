import styled from 'styled-components';

const HeaderS = styled.div`
  border: 1px solid green;
  height: 60px;
  width: 100%;
  // cria um grid com 1 linha e 4 colunas
  display: grid;
  grid-template-columns: 200px 200px 1fr 200px 50px;
  grid-template-rows: 1fr;
  grid-template-areas: 'btn1 btn2 space n btn3';
  align-items: center;
  justify-content: center;
  text-align: center;
  #customerBtns {
    display: flex;
    width: 400px;
    height: 100%;
  }
  #btn1 {
    grid-area: btn1;
    border: 1px solid red;
    height: 100%;
    width: 100%;
  }
  #btn2 {
    grid-area: btn2;
    border: 1px solid blue;
    height: 100%;
    width: 100%;
  }
  #name {
    grid-area: n;
    border: 1px solid green;
    height: 100%;
    width: 100%;
  }
  #logouAndThemeDiv {
    border: 1px solid blue;
    grid-area: btn3;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    #leaveBtn {
      border: 1px solid blue;
      height: 100%;
      width: 100%;
    }
  }
`;

export default HeaderS;
