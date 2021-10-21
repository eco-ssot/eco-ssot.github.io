import { renderWithProviders } from '../../__mocks__/helpers';
import ErrorHandler from '../../renderless/error-handler/ErrorHandler';

test('ErrorHandler', () => {
  const { container } = renderWithProviders(<ErrorHandler />);
  expect(container.firstChild).toBeNull();
});
