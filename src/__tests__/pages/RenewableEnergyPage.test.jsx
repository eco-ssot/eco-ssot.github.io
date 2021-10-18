import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import RenewableEnergyPage from '../../pages/renewable-energy/RenewableEnergyPage';

describe('RenewableEnergyPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<RenewableEnergyPage />);
    expect(queryByText(/可再生能源占比/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/占比 > 60 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
