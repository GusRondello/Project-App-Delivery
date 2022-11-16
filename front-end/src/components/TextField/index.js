import React from 'react';
import styled from 'styled-components';
import FieldBase from '../FieldBase';

const StyledInput = styled.input`
  font-family: inherit;
  font-size: 16px;
  padding: 4px 8px;
  border: 1px solid ${(p) => p.theme.inputBorder};
  color: ${(p) => p.theme.inputTextColor};
  background: ${(p) => p.theme.inputBackground};
  border-radius: 4px;
  width: 100%;

  &:hover,
  &:focus {
    border-color: ${(p) => p.theme.main};
  }
`;

export default function TextField({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  'data-testid': testId,
}) {
  return (
    <FieldBase name={ name } label={ label }>
      <StyledInput
        id={ name }
        name={ name }
        data-testid={ testId }
        type={ type }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange }
      />
    </FieldBase>
  );
}
