// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import echarts from 'echarts/lib/echarts';

import packageJson from '../package.json';

import { server } from './__mocks__/server';

// make debug output for TestingLibrary Errors larger
process.env.DEBUG_PRINT_LIMIT = '15000';

process.env.REACT_APP_MOCK_API = '0';
process.env.REACT_APP_MOCK_KEYCLOAK = '1';
process.env.REACT_APP_API_BASE_URL =
  'https://eco-ssot-2021-ingress-api.eco-ssot-2021-dev.10.37.66.1.k8sprd-whq.k8s.wistron.com/api';

process.env.REACT_APP_KEYCLOAK_REALM = 'k8sprdwhqecossot2021';
process.env.REACT_APP_KEYCLOAK_URL = 'https://keycloak-prd.wistron.com/auth';
process.env.REACT_APP_KEYCLOAK_CLIENT_ID = 'eco-ssot-frontend';

let echartsSpy;

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
  echartsSpy = jest.spyOn(echarts, 'init').mockImplementation(() => null);
});

afterAll(() => {
  server.close();
  echartsSpy.mockRestore();
});

afterEach(() => {
  server.resetHandlers();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: () => ({
    pathname: '/',
    search: '',
    hash: '',
  }),
}));

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getComputedStyle: (prop) => {
      return '15px';
    },
  }),
});

packageJson.version = '0.7.13';
