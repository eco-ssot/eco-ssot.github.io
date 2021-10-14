import { render } from '@testing-library/react';

import Avatar from '../../components/avatar/Avatar';

test('Arrow', () => {
  const { asFragment } = render(<Avatar />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="block truncate"
      />
    </DocumentFragment>
  `);
});
