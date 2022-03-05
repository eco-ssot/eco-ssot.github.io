// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';

import packageJson from '../package.json';

import { server } from './__mocks__/server';

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = '15000';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterAll(() => {
  server.close();
});

afterEach(() => {
  server.resetHandlers();
});

jest.mock('./charts/Chart.jsx', () => () => <></>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
    state: {},
  }),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }) => children,
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: () => new Promise(() => {}),
    },
  }),
}));

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getComputedStyle: (prop) => {
      return '15px';
    },
  }),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;
packageJson.version = '0.7.13';
