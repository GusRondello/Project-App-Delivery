import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

function renderWithRouter(component, historyEntries = ['/']) {
  const history = createMemoryHistory({ initialEntries: historyEntries });

  return render(
    <MemoryRouter history={ history } initialEntries={ historyEntries }>
      {component}
    </MemoryRouter>,
    history,
  );
}

export default renderWithRouter;
