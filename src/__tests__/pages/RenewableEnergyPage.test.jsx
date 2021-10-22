import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import RenewableEnergyHistoryTable from '../../pages/renewable-energy/RenewableEnergyHistoryTable';
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

describe('RenewableEnergyHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <RenewableEnergyHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
