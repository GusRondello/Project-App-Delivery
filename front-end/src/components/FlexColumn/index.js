import styled from 'styled-components';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${(p) => p.gap};
  align-items: ${(p) => p.align};
`;

FlexColumn.defaultProps = {
  gap: '0px',
  align: 'flex-start',
};

export default FlexColumn;
