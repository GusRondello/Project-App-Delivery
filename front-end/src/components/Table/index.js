import styled from 'styled-components';

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;

  & td,
  & th {
    border: 1px solid ${(p) => p.theme.paragraph};
    padding: 8px;
  }

  & td.align-right,
  & th.align-right {
    text-align: right;
  }

  & th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: ${(p) => p.theme.secondary};
    color: ${(p) => p.theme.paragrapah};
  }

  & > thead th,
  & > tbody > tr:not(:last-child) > td {
    border-bottom-width: 0;
  }

  & th:not(:last-child),
  & td:not(:last-child) {
    border-right-width: 0;
  }

  & > *:first-child > *:first-child > *:first-child {
    border-top-left-radius: 4px;
  }

  & > *:first-child > *:first-child > *:last-child {
    border-top-right-radius: 4px;
  }

  & > *:last-child > *:last-child > *:first-child {
    border-bottom-left-radius: 4px;
  }

  & > *:last-child > *:last-child > *:last-child {
    border-bottom-right-radius: 4px;
  }
`;

export default Table;
