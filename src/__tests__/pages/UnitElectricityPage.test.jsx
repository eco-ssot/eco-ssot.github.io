import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import UnitElectricityHistoryTable from '../../pages/unit-electricity/UnitElectricityHistoryTable';
import UnitElectricityPage from '../../pages/unit-electricity/UnitElectricityPage';

describe('UnitElectricityPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<UnitElectricityPage />);
    expect(queryByText(/單台用電/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比去年下降 3 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('UnitElectricityHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <UnitElectricityHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
