import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WeatherInfo from '../../components/weather-info/WeatherInfo';

describe('WeatherInfo', () => {
  it('handles good response', async () => {
    const { asFragment, queryByText } = renderWithProviders(<WeatherInfo />);
    await waitFor(() => expect(queryByText(/22 ºC/i)).toBeInTheDocument());
    await waitFor(() => expect(queryByText(/72 %/i)).toBeInTheDocument());
    expect(asFragment).toMatchInlineSnapshot(`[Function]`);
  });
});
