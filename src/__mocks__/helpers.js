import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { store } from '../app/store';

export function wrapper({ children }) {
  return (
    <Provider store={store}>
      <MemoryRouter>{children} </MemoryRouter>
    </Provider>
  );
}

export function renderWithProviders(ui, { preloadedState = {}, ...renderOptions } = {}) {
  return { store, ...render(ui, { wrapper, ...renderOptions }) };
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
