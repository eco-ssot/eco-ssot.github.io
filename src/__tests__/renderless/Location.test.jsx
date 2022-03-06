import { renderWithProviders } from '../../__mocks__/helpers';
import Location from '../../renderless/location/Location';

test('Location', () => {
  const { asFragment } = renderWithProviders(<Location />);
  expect(asFragment().firstChild).toBeNull();
});
