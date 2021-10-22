import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import CarbonHistoryTable from '../../pages/carbon/CarbonHistoryTable';
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

describe('CarbonHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <CarbonHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
