import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  row-gap: ${(p) => p.gap};
  align-items: ${(p) => p.align};
  justify-content: ${(p) => p.justify};
`;

FlexColumn.defaultProps = {
  gap: '0px',
  align: 'flex-start',
  justify: 'unset',
};

export default FlexColumn;
