import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import ElectricityHistoryTable from '../../pages/electricity/ElectricityHistoryTable';
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

describe('ElectricityHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <ElectricityHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
