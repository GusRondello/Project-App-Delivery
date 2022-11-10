import styled from 'styled-components';

export const DivExterna = styled.div`
  /* border: 3px solid green; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoginS = styled.div`  
  /* border: 1px solid red; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  #loginForm {
    border: 1px solid blue;
    height: 300px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    /* gap: 20px; */
    input {
      height: 30px;
      width: 200px;
      border-radius: 2px;
      border: 2px solid var(--headline);
      padding: 5px;
      display: flex;
      // posiciona os elementos a direita
      /* justify-content: flex-end;
      align-items: flex-end;
      text-align: left; */
    }
  }
`;
