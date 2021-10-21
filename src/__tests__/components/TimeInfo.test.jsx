import { render } from '@testing-library/react';
import MockDate from 'mockdate';

import TimeInfo from '../../components/time-info/TimeInfo';

test('TimeInfo', () => {
  MockDate.set('2021-10-21T08:00:00.000Z');

  const { queryByText } = render(<TimeInfo />);
  expect(queryByText(/2021年 10月 21日/i)).toBeInTheDocument();

  MockDate.reset();
});
