import React from 'react';
import styled from 'styled-components';
import FlexColumn from '../FlexColumn';

const StyledLabel = styled.label`
  font-weight: bold;
  color: ${(p) => p.theme.paragraph};
`;

export default function FieldBase({ name, label, children }) {
  return (
    <FlexColumn gap="4px">
      <StyledLabel htmlFor={ name }>{label}</StyledLabel>
      {children}
    </FlexColumn>
  );
}
