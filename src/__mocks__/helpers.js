import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../app/store';

function renderWithProviders(ui, { preloadedState = {}, ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

async function getHistoryData(resource, req) {
  const monthType = req.url.searchParams.get('monthType');
  const startYear = req.url.searchParams.get('startYear');
  const endYear = req.url.searchParams.get('endYear');
  let type = monthType;
  if (monthType === 'YTM') {
    type = 'index';
  }

  if (startYear && endYear && startYear === endYear) {
    type = 'sameYear';
  }

  const { default: data } = await import(`./get/${resource}/history/${type}.json`);
  return data;
}

export { renderWithProviders, getHistoryData };
