import styled from 'styled-components';

export const ProductsCardS = styled.div`
  border: 1px solid green;
  height: 100%;
  width: 100%;
  /* display: flex;
  flex-direction: column; */
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
`;

export const ProductsDivS = styled.div`
  border: 1px solid blue;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 16px;
  gap: 16px;
`;
