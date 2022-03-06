import { renderWithProviders } from '../../__mocks__/helpers';
import Loader from '../../renderless/loader/Loader';

test('Loader', () => {
  const { asFragment } = renderWithProviders(<Loader />);
  expect(asFragment().firstChild).toBeNull();
});
