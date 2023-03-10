import styled from 'styled-components';

export const DivExterna = styled.div`
  /* border: 3px solid green; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterS = styled.div`  
  /* border: 1px solid red; */
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 22px;
    margin-bottom: 15px;
  }
  #registerForm {
    border: 1px solid var(--buttonBorder);
    height: 300px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 4px;
    box-shadow: 0 5px 3px rgb(145 103 172 / 12%), 0 3px 2px rgb(145 103 172 / 24%);
    #inputs {
      padding: 5px;
      label {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        gap: 5px; 
        margin-bottom: 10px;
        #inputTitle {
          font-size: 18px;
          margin-left: 10px;
        }   
        input {
          border: 1px solid var(--headline);
          height: 40px;
          width: 200px;
          padding: 5px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
        }
      }
    }

    #registerButton {
      background-color: var(--buttonBackground);
      color: var(--buttonText);
      border: 1px solid var(--buttonBorder);
      width: 200px;
      height: 30px;
      line-height: 2.5em;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;
