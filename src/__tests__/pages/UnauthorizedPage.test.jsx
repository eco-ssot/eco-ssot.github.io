import { renderWithProviders } from '../../__mocks__/helpers';
import UnauthorizedPage from '../../pages/unauthorized/UnauthorizedPage';

describe('UnauthorizedPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<UnauthorizedPage />);
    expect(getByText(/Unauthorized/)).toBeInTheDocument();
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        Unauthorized
      </DocumentFragment>
    `);
  });
});
