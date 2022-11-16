import styled from 'styled-components';

const HeaderS = styled.div`
  width: 100%;
  padding: 8px 16px;
  display: flex;
  column-gap: 16px;
  align-items: center;
  justify-content: center;
  background-color: var(--tertiary);

  .header-button {
    border-radius: 4px;
    background-color: var(--secundary);
    border: 1px solid var(--secundary);
    padding: 12px 18px;
    text-decoration: none;
    font-weight: bold;
    color: var(--buttonText);
    cursor: pointer;
    text-transform: uppercase;

    &.active {
      background-color: var(--buttonBackground);
      border: 1px solid var(--buttonBackground);
    }

    &:hover {
      filter: brightness(0.9);
    }
  }

  #name { margin-left: auto;}
`;

export default HeaderS;
