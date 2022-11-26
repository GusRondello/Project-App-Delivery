import styled from 'styled-components';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  box-sizing: border-box;
  column-gap: ${(p) => p.gap};
  align-items: ${(p) => p.align};
  justify-content: ${(p) => p.justify};
`;

FlexRow.defaultProps = {
  gap: '0px',
  align: 'center',
  justify: 'flex-start',
};

export default FlexRow;
