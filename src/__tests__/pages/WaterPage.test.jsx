import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WaterPage from '../../pages/water/WaterPage';

describe('WaterPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WaterPage />);
    expect(queryByText(/十億營業額用水/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比2016年下降 9 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
