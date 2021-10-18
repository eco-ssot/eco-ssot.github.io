import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import ElectricityPage from '../../pages/electricity/ElectricityPage';

describe('ElectricityPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<ElectricityPage />);
    expect(queryByText(/十億營業額用電/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比去年下降 2 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
