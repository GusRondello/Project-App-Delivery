import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = styled.button`
  border-radius: 4px;
  background-color: var(--secundary);
  border: 1px solid var(--secundary);
  padding: 12px 18px;
  text-decoration: none;
  font-weight: bold;
  color: var(--buttonText);
  cursor: pointer;
  text-transform: uppercase;
  width: ${(p) => (p.full ? '100%' : 'unset')};

  &.active {
    background-color: var(--buttonBackground);
    border: 1px solid var(--buttonBackground);
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

export const LinkButton = Button.withComponent(Link);

export default Button;
