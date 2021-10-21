import { render } from '@testing-library/react';
import MockDate from 'mockdate';

import TimeInfo from '../../components/time-info/TimeInfo';

test('TimeInfo', () => {
  MockDate.set('2021-10-21');

  const { asFragment } = render(<TimeInfo />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="block truncate"
      >
        2021年 10月 21日 08:00
      </div>
    </DocumentFragment>
  `);

  MockDate.reset();
});
