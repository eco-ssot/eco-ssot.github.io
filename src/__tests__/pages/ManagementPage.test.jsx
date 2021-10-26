import { waitFor } from '@testing-library/react';

import usersJson from '../../__mocks__/get/users';
import { renderWithProviders } from '../../__mocks__/helpers';
import DataStatusPage from '../../pages/management/DataStatusPage';
import GoalPage from '../../pages/management/GoalPage';
import ManagementPage from '../../pages/management/ManagementPage';
import PicPage from '../../pages/management/PicPage';

describe('ManagementPage', () => {
  it('handles good response', async () => {
    const { queryByText } = renderWithProviders(<ManagementPage />);
    expect(queryByText(/年度目標維護/i)).toBeInTheDocument();
  });
});

describe('Goal Page', () => {
  it('handles good response', async () => {
    const { queryByText } = renderWithProviders(<GoalPage canEdit={true} />);
    expect(queryByText(/年度目標/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/用電強度/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/WNH/i)).toBeInTheDocument());
  });
});

describe('Data Status Page', () => {
  it('handles good response', async () => {
    const { queryByText } = renderWithProviders(<DataStatusPage />);
    await waitFor(() => expect(queryByText(/Plant/i)).toBeInTheDocument());
  });
});

describe('PIC Page', () => {
  it('handles good response', async () => {
    const { queryByText } = renderWithProviders(<PicPage users={usersJson} />);
    await waitFor(() => expect(queryByText(/Plant/i)).toBeInTheDocument());
  });
});
