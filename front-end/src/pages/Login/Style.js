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
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  #logo {
    height: 300px;
    margin-top: -300px;
  }

  #loginForm {
    border: 1px solid var(--buttonBorder);
    border-radius: 4px;
    box-shadow: 0 5px 3px rgb(145 103 172 / 12%),
      0 3px 2px rgb(145 103 172 / 24%);
    padding: 24px;
  }
`;
