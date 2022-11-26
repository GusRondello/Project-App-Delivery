import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';

const Button = styled.button`
  border-radius: 4px;
  background-color: var(--secondary);
  border: 1px solid var(--secondary);
  padding: 12px 18px;
  text-decoration: none;
  font-weight: bold;
  color: var(--buttonText);
  cursor: pointer;
  text-transform: uppercase;
  width: ${(p) => (p.full ? '100%' : 'unset')};
  display: inline-flex;
  column-gap: 4px;
  align-items: center;
  justify-content: center;
  text-align: center;

  &.active {
    background-color: var(--buttonBackground);
    border: 1px solid var(--buttonBackground);
  }

  &:hover:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    cursor: not-allowed;
    filter: saturate(0);
  }
`;

Button.defaultProps = {
  role: 'button',
  type: 'button',
};

const LinkButton = Button.withComponent(Link);
LinkButton.defaultProps = {
  role: 'button',
  type: undefined,
};

const NavLinkButton = Button.withComponent(NavLink);
NavLinkButton.defaultProps = {
  role: 'button',
  type: undefined,
};

export { LinkButton, NavLinkButton };

export default Button;
