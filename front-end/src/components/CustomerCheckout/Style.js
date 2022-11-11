import styled from 'styled-components';

export const CheckoutTableS = styled.div`
  border: 1px solid blue;
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
  #checkoutTable {
    border: 1px solid var(--main);
    padding: 8px;
    #totalPrice {
      display: flex;
      justify-content: flex-end;
      padding: 10px;
    }
    #table {
      width: 100%;
      padding: 8px;
      border-collapse: separate; 
      border-spacing: 0 10px; 
      margin-top: -10px; /* correct offset on first border spacing if desired */
  
      td, th {
        padding: 8px;
        align-items: center;
        text-align: center;
      }
      th {
        font-size: 10px;
      }
      td {
        border: solid 1px #000;
        padding: 0;
        height: 30px;
      }
      td:first-child {
        border-left-style: solid;
        border-top-left-radius: 10px; 
        border-bottom-left-radius: 10px;
      }
      td:last-child {
        border-right-style: solid;
        border-bottom-right-radius: 10px; 
        border-top-right-radius: 10px; 
      }

      #tableElIndex {
        background-color: var(--tertiary);
      }
      #tableElNameBody {
        background-color: var(--main);
        width: 300px;
      }
      #tableElQtd {
        background-color: var(--buttonBackground);
      }
      #tableElPrice {
        background-color: var(--extra);
        width: 83px;
      }
      #tableElSubTotal {
        background-color: var(--secundary);
        width: 83px;
      }
      #tableElRmItem {
        background-color: var(--tertiary);
        width: 100px;
        #btnRmItem {
          background-color: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
          border-bottom-right-radius: 10px; 
          border-top-right-radius: 10px; 
        }
      }
    }
  }
`;

export const ProductsCardS = styled.div`
  border: 1px solid var(--main);
  background-color: var(--main);
  height: 250px;
  width: 200px;
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
    margin: 3px;
  }
  #productImage {
    height: 180px;
    width: 198px;
    margin-bottom: 4px;
    // border-radius apenas na parte de cima
    border-radius: 3px 3px 0 0;
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
