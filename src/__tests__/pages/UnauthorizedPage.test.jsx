import { renderWithProviders } from '../../__mocks__/helpers';
import UnauthorizedPage from '../../pages/unauthorized/UnauthorizedPage';

describe('UnauthorizedPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<UnauthorizedPage />);
    expect(queryByText(/Unauthorized/i)).toBeInTheDocument();

    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
