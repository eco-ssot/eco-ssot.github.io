import { render } from '@testing-library/react';

import Avatar from './Avatar';

test('Arrow', () => {
  const { container } = render(<Avatar />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="block truncate"
    />
  `);
});
