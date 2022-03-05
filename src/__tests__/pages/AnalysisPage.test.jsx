import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import ElectricityAnalysisPage from '../../pages/electricity/ElectricityAnalysisPage';
import WasteAnalysisPage from '../../pages/waste/WasteAnalysisPage';
import WaterAnalysisPage from '../../pages/water/WaterAnalysisPage';

describe('ElectricityAnalysisPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('ElectricityAnalysisPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('WaterAnalysisPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(queryByText(/221,384/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});

describe('WasteAnalysisPage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(queryByText(/1,481.51/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
