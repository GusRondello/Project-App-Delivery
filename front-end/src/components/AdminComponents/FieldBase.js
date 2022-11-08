import React from 'react';
import propTypes from 'prop-types';

function FieldBase({ name, label, children }) {
  return (
    <div>
      <label htmlFor={ name }>{label}</label>
      {children}
    </div>
  );
}

FieldBase.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  children: propTypes.element.isRequired,
};

export default FieldBase;
