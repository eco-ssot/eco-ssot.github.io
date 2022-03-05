import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, sleep } from '../../__mocks__/helpers';
import Header from '../../components/header/Header';

describe('Header', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<Header />);
    await sleep(1000);

    const boBtn = queryByText('ALL');
    fireEvent.click(boBtn);
    expect(screen.getByText('WT')).toBeInTheDocument();
    expect(screen.getByText('WSD')).toBeInTheDocument();

    const siteBtn = queryByText('Sites / Plants');
    fireEvent.click(siteBtn);
    expect(screen.getByText('WCD')).toBeInTheDocument();
    expect(screen.getByText('WCQ')).toBeInTheDocument();

    const lngBtn = queryByText('中文');
    fireEvent.click(lngBtn);
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
