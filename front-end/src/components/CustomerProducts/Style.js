import styled from 'styled-components';

export const ProductsDivS = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  padding: 16px;
  gap: 16px;
`;

export const ProductsCardS = styled.div`
  border: 1px solid var(--main);
  background-color: var(--main);
  height: 250px;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 3px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  #productPrice {
    font-weight: bold;
    position: absolute;
    margin: 4px;
    text-align: center;
    color: #c0392b;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    padding: 8px;
  }
  #productImage {
    height: 180px;
    width: 100%;
    margin-bottom: 4px;
    background: white;
    // border-radius apenas na parte de cima
    border-radius: 3px 3px 0 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  #productName {
    margin-bottom: 10px;
    font-size: 15px;
    font-weight: bold;
  }
  #quantityDiv {
    display: flex;
    justify-content: space-between;
    width: 100px;
    margin: 0 auto;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance:textfield; /* Firefox */
    }
    button {
      width: 30px;
      height: 30px;
      border: 1px solid var(--buttonBorder);
      background-color: var(--buttonBackground);
      cursor: pointer;
      border-radius: 10%;
      font-size: 20px;
      font-weight: bold;
    }
    input {
      width: 40px;
      height: 30px;
      border: 1px solid var(--buttonBorder);
      border-radius: 10%;
      background-color: white;
      text-align: center;
    }
  }
`;
