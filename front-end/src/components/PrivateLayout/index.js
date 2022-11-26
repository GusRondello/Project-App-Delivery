import React from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import FlexColumn from '../FlexColumn';

const Wrapper = styled(FlexColumn)`
  height: 100%;
`;

const Main = styled(FlexColumn.withComponent('main'))`
  width: 90%;
  max-width: 1200px;
  margin: 24px auto;
`;

export default function PrivateLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Main>{children}</Main>
    </Wrapper>
  );
}

PrivateLayout.propTypes = {
  children: propTypes.node.isRequired,
};
