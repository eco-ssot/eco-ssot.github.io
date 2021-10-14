import { render } from '@testing-library/react';

import Dot from './Dot';

test('Dot', () => {
  const { container } = render(<Dot />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="relative flex h-3 w-3"
    >
      <div
        class="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 bg-dangerous-700"
      />
      <div
        class="relative inline-flex rounded-full h-3 w-3 bg-dangerous-700"
      />
    </div>
  `);
});
