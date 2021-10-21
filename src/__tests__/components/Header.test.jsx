import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import Header from '../../components/header/Header';

describe('Header', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<Header />);
    await waitFor(() => expect(queryByText(/22 ºC/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/72 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
