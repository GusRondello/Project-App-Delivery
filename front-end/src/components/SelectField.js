import React from 'react';
import propTypes from 'prop-types';
import FieldBase from './FieldBase';

function SelectField({ name, label, testId, options, value, onChange }) {
  return (
    <FieldBase name={ name } label={ label }>
      <select
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
      </select>
    </FieldBase>
  );
}

SelectField.propTypes = {
  name: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
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
