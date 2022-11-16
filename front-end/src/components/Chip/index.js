import styled from 'styled-components';

const Chip = styled.span`
  font-size: 14px;
  display: inline-block;
  padding: 6px 8px;
  background: ${(p) => p.theme.secondary};
  border-radius: 4px;
`;

export default Chip;
