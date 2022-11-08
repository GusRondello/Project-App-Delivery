import React from 'react';
import propTypes from 'prop-types';
import FieldBase from './FieldBase';

function TextField({ name, label, testId, type, value, onChange }) {
  return (
    <FieldBase name={ name } label={ label }>
      <input
        type={ type }
        name={ name }
        id={ name }
        data-testid={ testId }
        value={ value }
        onChange={ onChange }
      />
    </FieldBase>
  );
}

TextField.defaultProps = {
  type: 'text',
};

TextField.propTypes = {
  type: propTypes.string,
  name: propTypes.string.isRequired,
  testId: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  value: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};

export default TextField;
