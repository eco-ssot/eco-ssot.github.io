import { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { renderWithProviders } from '../__mocks__/helpers';
import App from '../app/App';

describe('App', () => {
  it('switches sites', async () => {
    const { queryByText } = renderWithProviders(<App />);
    await waitFor(() => expect(queryByText(/2021.01 - 06/i)).toBeInTheDocument());
    const select = queryByText('ALL');

    userEvent.click(select);
    userEvent.click(queryByText('WT'));
    await waitFor(() => expect(queryByText(/WT/i)).toBeInTheDocument());
    expect(window.location.search).toBe('?business=WT');

    userEvent.click(select);
    userEvent.click(queryByText('WSD'));
    await waitFor(() => expect(queryByText(/WT/i)).toBeInTheDocument());
    expect(window.location.search).toBe('?business=WSD');
  });

  it('switches tabs', async () => {
    const { queryByText } = renderWithProviders(<App />);
    await waitFor(() => expect(queryByText(/2021.01 - 06/i)).toBeInTheDocument());

    userEvent.click(queryByText('首頁'));
    expect(window.location.pathname).toBe('/home');

    userEvent.click(queryByText('總覽比較'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/overview');

    userEvent.click(queryByText('碳排放量'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/carbon');

    userEvent.click(queryByText('可再生能源'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/renewable-energy');

    userEvent.click(queryByText('用電'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/electricity');

    userEvent.click(queryByText('用水'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/water');

    userEvent.click(queryByText('單台用電'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/unit-electricity');

    userEvent.click(queryByText('廢棄物'));
    await waitFor(() => expect(queryByText('Site')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/waste');

    userEvent.click(queryByText('後台設定'));
    await waitFor(() => expect(queryByText('用電強度')).toBeInTheDocument());
    expect(window.location.pathname).toBe('/management/goal');
  });
});
