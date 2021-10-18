import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import CarbonPage from '../../pages/carbon/CarbonPage';

describe('CarbonPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<CarbonPage />);
    expect(queryByText(/碳排放管理/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比2016年下降 21 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
