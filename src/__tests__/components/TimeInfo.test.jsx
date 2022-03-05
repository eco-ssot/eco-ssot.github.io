import { render } from '@testing-library/react';

import TimeInfo from '../../components/time-info/TimeInfo';

test('TimeInfo', () => {
  const { asFragment } = render(<TimeInfo />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="block truncate"
      >
        2021年 10月 21日 00:00
      </div>
    </DocumentFragment>
  `);
});
