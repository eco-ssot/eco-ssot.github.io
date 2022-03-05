import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { store } from '../app/store';

export function storeWrapper({ children }) {
  return (
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
}

export function renderWithProviders(ui, { preloadedState = {}, ...renderOptions } = {}) {
  return { store, ...render(ui, { wrapper: storeWrapper, ...renderOptions }) };
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
