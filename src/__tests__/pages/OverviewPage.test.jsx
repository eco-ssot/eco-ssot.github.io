import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import OverviewHistoryTable from '../../pages/overview/OverviewHistoryTable';
import OverviewPage from '../../pages/overview/OverviewPage';

describe('OverviewPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<OverviewPage />);
    expect(queryByText(/用電、用水、營收及ASP比較/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/2021.01 - 06/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('OverviewHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<OverviewHistoryTable year="2021" dimension="ALL" />);
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
