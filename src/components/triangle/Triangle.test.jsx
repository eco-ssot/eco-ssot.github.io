import { render } from '@testing-library/react';

import Triangle from './Triangle';

test('Triangle', () => {
  const { container } = render(<Triangle />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="w-0 h-0 border-t-[0.25rem] border-t-transparent border-b-[0.25rem] border-b-transparent border-l-[0.5rem] border-l-primary-600"
    />
  `);
});
