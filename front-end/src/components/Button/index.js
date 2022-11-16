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

  &.active {
    background-color: var(--buttonBackground);
    border: 1px solid var(--buttonBackground);
  }

  &:hover {
    filter: brightness(0.9);
  }
`;

Button.defaultProps = {
  type: 'button',
};

const LinkButton = Button.withComponent(Link);
LinkButton.defaultProps = { type: undefined };

const NavLinkButton = Button.withComponent(NavLink);
NavLinkButton.defaultProps = { type: undefined };

export { LinkButton, NavLinkButton };

export default Button;
