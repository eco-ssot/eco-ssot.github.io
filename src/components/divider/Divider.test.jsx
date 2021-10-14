import { render } from '@testing-library/react';

import Divider from './Divider';

test('Divider', () => {
  const { container } = render(<Divider />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="h-4 mx-4 border-0 border-r border-divider"
    />
  `);
});
