import styled from 'styled-components';

export const DivExterna = styled.div`
  /* border: 3px solid green; */
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProductsS = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  text-align: center;

  #cartButton {
    padding: 20px;
    background-color: var(--tertiary);
    color: var(--buttonText);
    border: 1px solid var(--tertiary);
    width: 200px;
    height: 30px;
    line-height: 2.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 1px 3px rgb(145 103 172 / 12%), 0 1px 2px rgb(145 103 172 / 24%);
    border-radius: 4px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: var(--secundary);
      border: 1px solid var(--secundary);
    }
    // posiciona o botão no canto inferior direito da tela
    position: fixed;
    bottom: 8px;
    right: 8px;
  }
`;
