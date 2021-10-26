import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders, sleep } from '../__mocks__/helpers';
import ElectricityAnalysisPage from '../pages/electricity/ElectricityAnalysisPage';
import WasteAnalysisPage from '../pages/waste/WasteAnalysisPage';
import WaterAnalysisPage from '../pages/water/WaterAnalysisPage';

describe('Electricity Analysis', () => {
  it('handles post electricity analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = queryByText(/新增說明/i);
    userEvent.click(button);
    await sleep(100);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textBox) => userEvent.type(textBox, 'Hello World!'));
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });

  it('handles patch electricity analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const buttons = getAllByRole('button');
    const editButton = buttons.filter(({ className }) => className.includes('rounded-full'))[0];
    userEvent.click(editButton);
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });
});

describe('Water Analysis', () => {
  it('handles post water analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(queryByText(/221,384/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = queryByText(/新增說明/i);
    userEvent.click(button);
    await sleep(100);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textBox) => userEvent.type(textBox, 'Hello World!'));
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });

  it('handles patch water analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(queryByText(/221,384/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const buttons = getAllByRole('button');
    const editButton = buttons.filter(({ className }) => className.includes('rounded-full'))[0];
    userEvent.click(editButton);
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });
});

describe('Waste Analysis', () => {
  it('handles post waste analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(queryByText(/1,481.51/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = queryByText(/新增說明/i);
    userEvent.click(button);
    await sleep(100);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textBox) => userEvent.type(textBox, 'Hello World!'));
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });

  it('handles patch waste analysis response', async () => {
    const { queryByText, getAllByRole } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(queryByText(/1,481.51/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const buttons = getAllByRole('button');
    const editButton = buttons.filter(({ className }) => className.includes('rounded-full'))[0];
    userEvent.click(editButton);
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });
});
