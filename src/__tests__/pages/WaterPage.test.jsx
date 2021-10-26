import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WaterHistoryTable from '../../pages/water/WaterHistoryTable';
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

describe('WaterHistoryTable', () => {
  it('ytm', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WaterHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });

  it('single', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WaterHistoryTable startYear="2016" endYear="2021" monthType="single" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });

  it('same year', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WaterHistoryTable startYear="2021" endYear="2021" monthType="YTM" startMonth="1" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2021 年 1 月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
