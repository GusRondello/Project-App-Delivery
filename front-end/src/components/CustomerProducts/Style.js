import styled from 'styled-components';

export const ProductsDivS = styled.div`
  border: 1px solid blue;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
`;

export const ProductsCardS = styled.div`
  border: 2px solid green;
  height: 250px;
  width: 200px;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  #productPrice {
    font-weight: bold;
    position: absolute;
    margin: 3px;
  }
  #productImage {
    height: 180px;
    width: 196px;
    margin-bottom: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  #productName {
    margin-bottom: 4px;
    font-size: 14px;
  }
  #quantityDiv {
    /* border: 1px solid red; */
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
      border: 1px solid black;
      border-radius: 10%;
      background-color: white;
      font-size: 20px;
      font-weight: bold;
    }
    input {
      width: 40px;
      height: 30px;
      border: 1px solid black;
      border-radius: 10%;
      background-color: white;
      text-align: center;
    }
  }
`;
