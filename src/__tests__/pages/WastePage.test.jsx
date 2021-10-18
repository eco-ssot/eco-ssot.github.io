import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WastePage from '../../pages/waste/WastePage';

describe('WastePage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WastePage />);
    expect(queryByText(/廢棄物產生密度/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比2018年下降 2 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
