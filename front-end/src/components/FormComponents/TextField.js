import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import FieldBase from './FieldBase';

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

TextField.defaultProps = {
  type: 'text',
  placeholder: '',
};

TextField.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string,
  name: propTypes.string.isRequired,
  'data-testid': propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
