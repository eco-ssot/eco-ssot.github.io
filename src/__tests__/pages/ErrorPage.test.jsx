import { renderWithProviders } from '../../__mocks__/helpers';
import ErrorPage from '../../pages/error/ErrorPage';

describe('ErrorPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<ErrorPage message="error message" />);
    expect(queryByText(/error message/i)).toBeInTheDocument();
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
