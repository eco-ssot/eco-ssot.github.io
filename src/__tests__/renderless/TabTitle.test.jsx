import { renderWithProviders } from '../../__mocks__/helpers';
import TabTitle from '../../renderless/tab-title/TabTitle';

test('TabTitle', () => {
  const { container } = renderWithProviders(<TabTitle />);
  expect(container.firstChild).toBeNull();
});
