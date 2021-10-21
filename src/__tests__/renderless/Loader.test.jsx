import { renderWithProviders } from '../../__mocks__/helpers';
import Loader from '../../renderless/loader/Loader';

test('Loader', () => {
  const { container } = renderWithProviders(<Loader />);
  expect(container.firstChild).toBeNull();
});
