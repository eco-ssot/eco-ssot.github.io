import { fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../__mocks__/helpers';
import App from '../app/App';

describe('App', () => {
  test('navigates business and sites', async () => {
    const { getByLabelText, findByLabelText, getByText } = renderWithProviders(<App />);
    const businessSelect = getByLabelText(/select-business/);
    const sitePlantSelect = getByLabelText(/select-site-plant/);
    let option;

    userEvent.click(businessSelect);
    option = await findByLabelText(/option-WSD/);
    userEvent.click(option);
    expect(window.location.search).toBe('?business=WSD');
    await waitFor(() => expect(getByText(/40%/)).toBeInTheDocument());

    fireEvent.click(sitePlantSelect);
    option = await findByLabelText(/option-WCD/);
    fireEvent.click(option);
    expect(window.location.search).toBe('?business=WSD&s=WCD');
    await waitFor(() => expect(getByText(/21%/)).toBeInTheDocument());
  });
});
