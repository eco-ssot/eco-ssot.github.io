import { renderWithProviders } from '../../__mocks__/helpers';
import Location from '../../renderless/location/Location';

test('Location', () => {
  const { container } = renderWithProviders(<Location />);
  expect(container.firstChild).toBeNull();
});
