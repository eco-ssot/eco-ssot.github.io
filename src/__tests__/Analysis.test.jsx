import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../__mocks__/helpers';
import ElectricityAnalysisPage from '../pages/electricity/ElectricityAnalysisPage';
import WasteAnalysisPage from '../pages/waste/WasteAnalysisPage';
import WaterAnalysisPage from '../pages/water/WaterAnalysisPage';

describe('Electricity Analysis', () => {
  it('handles post electricity analysis response', async () => {
    const { queryByText, getByText, getAllByRole, getByLabelText } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = getByText(/analysisPage:addDesc/i);
    userEvent.click(button);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });

  it('handles patch electricity analysis response', async () => {
    const { queryByText, getAllByRole, getByLabelText, getAllByLabelText } = renderWithProviders(
      <ElectricityAnalysisPage />
    );

    await waitFor(() => expect(queryByText(/14,677,385/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const editButton = getAllByLabelText('icon-button-pencil')[0];
    userEvent.click(editButton);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });
});

describe('Water Analysis', () => {
  it('handles post water analysis response', async () => {
    const { queryByText, getAllByRole, getByText, getByLabelText } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(queryByText(/221,384/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = getByText(/analysisPage:addDesc/i);
    userEvent.click(button);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });

  it('handles patch water analysis response', async () => {
    const { queryByText, getAllByRole, getAllByLabelText, getByLabelText } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(queryByText(/221,384/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const editButton = getAllByLabelText('icon-button-pencil')[0];
    userEvent.click(editButton);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });
});

describe('Waste Analysis', () => {
  it('handles post waste analysis response', async () => {
    const { queryByText, getAllByRole, getByText, getByLabelText } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(queryByText(/1,481.51/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const button = getByText(/analysisPage:addDesc/i);
    userEvent.click(button);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });

  it('handles patch waste analysis response', async () => {
    const { queryByText, getAllByRole, getAllByLabelText, getByLabelText } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(queryByText(/1,481.51/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/1234 %/i)).toBeInTheDocument());
    const editButton = getAllByLabelText('icon-button-pencil')[0];
    userEvent.click(editButton);
    const textBoxes = getAllByRole('textbox');
    textBoxes.forEach((textbox, i) => userEvent.type(textbox, `Hello World! ${i}`));
    const saveButton = getByLabelText('icon-button-check');
    userEvent.click(saveButton);
    await waitFor(() => expect(queryByText(/Hello World! 0/i)).toBeInTheDocument());
  });
});
