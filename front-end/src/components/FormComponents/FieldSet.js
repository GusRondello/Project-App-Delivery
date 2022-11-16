import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import FlexRow from '../FlexRow';
import FlexColumn from '../FlexColumn';

const StyledFieldSet = styled(FlexColumn.withComponent('fieldset'))`
  padding: 8px 12px;
  border: 1px solid ${(p) => p.theme.paragraph};
  border-radius: 4px;
`;

export default function FieldSet({ children, button }) {
  return (
    <StyledFieldSet gap="16px">
      {children}
      {button && <FlexRow justify="flex-end">{button}</FlexRow>}
    </StyledFieldSet>
  );
}

FieldSet.defaultProps = {
  button: null,
};

FieldSet.propTypes = {
  button: propTypes.node,
  children: propTypes.node.isRequired,
};
