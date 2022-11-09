import React from 'react';
import propTypes from 'prop-types';

function FieldBase({ name, label, children }) {
  return (
    <div>
      <label htmlFor={ name }>
        {label}
        {children}
      </label>
    </div>
  );
}

FieldBase.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  children: propTypes.element.isRequired,
};

export default FieldBase;
