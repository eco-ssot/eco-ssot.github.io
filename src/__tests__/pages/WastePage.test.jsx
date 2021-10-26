import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WasteHistoryTable from '../../pages/waste/WasteHistoryTable';
import WastePage from '../../pages/waste/WastePage';

describe('WastePage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WastePage />);
    expect(queryByText(/廢棄物產生密度/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/對比2018年下降 2 %/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/Site/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('WasteHistoryTable', () => {
  it('ytm', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WasteHistoryTable startYear="2016" endYear="2021" monthType="YTM" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 1 - 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });

  it('single', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WasteHistoryTable startYear="2016" endYear="2021" monthType="single" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2016 年 12月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });

  it('same year', async () => {
    const { asFragment, queryByText } = renderWithProviders(
      <WasteHistoryTable startYear="2021" endYear="2021" monthType="YTM" startMonth="1" endMonth="12" />
    );

    await waitFor(() => expect(queryByText(/2021 年 1 月/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
