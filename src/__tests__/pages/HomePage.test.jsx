import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import HomePage from '../../pages/home/HomePage';

describe('HomePage', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<HomePage />);
    expect(queryByText(/各數值 Overview/i)).toBeInTheDocument();
    await waitFor(() => expect(queryByText(/目標 : 下降 21 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
