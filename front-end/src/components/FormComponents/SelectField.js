import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import FieldBase from './FieldBase';

const StyledSelect = styled.select`
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

function SelectField({
  name,
  label,
  'data-testid': testId,
  options,
  value,
  onChange,
}) {
  return (
    <FieldBase name={ name } label={ label }>
      <StyledSelect
        name={ name }
        id={ name }
        data-testid={ testId }
        value={ value }
        onChange={ onChange }
      >
        {options.map((option) => (
          <option key={ option.value } value={ option.value }>
            {option.label}
          </option>
        ))}
      </StyledSelect>
    </FieldBase>
  );
}

SelectField.propTypes = {
  name: propTypes.string.isRequired,
  'data-testid': propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string.isRequired,
      value: propTypes.string.isRequired,
    }),
  ).isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default SelectField;
