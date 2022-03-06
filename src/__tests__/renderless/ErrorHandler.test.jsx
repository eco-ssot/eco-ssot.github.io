import { renderWithProviders } from '../../__mocks__/helpers';
import ErrorHandler from '../../renderless/error-handler/ErrorHandler';

test('ErrorHandler', () => {
  const { asFragment } = renderWithProviders(<ErrorHandler />);
  expect(asFragment().firstChild).toBeNull();
});
