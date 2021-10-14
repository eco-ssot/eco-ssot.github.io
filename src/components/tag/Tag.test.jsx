import { render } from '@testing-library/react';

import Tag from './Tag';

test('Tag', () => {
  const { container } = render(<Tag />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
    />
  `);
});
