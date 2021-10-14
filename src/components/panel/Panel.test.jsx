import { render } from '@testing-library/react';

import Panel from './Panel';

test('Panel', () => {
  const { container } = render(<Panel />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2"
    >
      <div
        class="h-auto flex justify-between"
      />
      <div
        class="flex-grow"
      />
    </div>
  `);
});
