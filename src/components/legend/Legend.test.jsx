import { render } from '@testing-library/react';

import Legend from './Legend';

test('Legend', () => {
  const { container } = render(<Legend />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="flex items-center space-x-2"
    >
      <div
        class="h-3 w-3 rounded-full"
      />
      <div
        class=""
      />
    </div>
  `);
});
