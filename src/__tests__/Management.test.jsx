import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { renderWithProviders, sleep } from '../__mocks__/helpers';
import GoalPage from '../pages/management/GoalPage';

describe('Management', () => {
  it('handles year goal response', async () => {
    const { getAllByRole, queryByText } = renderWithProviders(<GoalPage canEdit={true} />);
    await waitFor(() => expect(queryByText(/用電強度/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/WNH/i)).toBeInTheDocument());
    const buttons = getAllByRole('button');
    const button = buttons[1];
    userEvent.click(button);
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });

  it('handles carbon index response', async () => {
    const { getAllByRole, queryByText } = renderWithProviders(<GoalPage canEdit={true} />);
    await waitFor(() => expect(queryByText(/用電強度/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/WNH/i)).toBeInTheDocument());
    const buttons = getAllByRole('button');
    const button = buttons[8];
    userEvent.click(button);
    await sleep(100);
    const saveButton = queryByText(/儲存/i);
    userEvent.click(saveButton);
    await sleep(1000);
    expect(queryByText(/儲存/i)).not.toBeInTheDocument();
  });
});
