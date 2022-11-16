import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import DeliveryProvider from '../../context/DeliveryProvider';

const renderWithRouter = (component, historyEntries = ['/']) => {
  const history = createMemoryHistory({ initialEntries: historyEntries });
  return {
    ...render(
      <DeliveryProvider>
        <MemoryRouter history={ history } initialEntries={ historyEntries }>
          {component}
        </MemoryRouter>
      </DeliveryProvider>,
    ),
    history,
  };
};

export default renderWithRouter;
