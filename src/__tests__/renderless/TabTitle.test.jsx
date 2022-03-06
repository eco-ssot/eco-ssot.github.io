import { renderWithProviders } from '../../__mocks__/helpers';
import TabTitle from '../../renderless/tab-title/TabTitle';

test('TabTitle', () => {
  const { asFragment } = renderWithProviders(<TabTitle />);
  expect(asFragment().firstChild).toBeNull();
});
