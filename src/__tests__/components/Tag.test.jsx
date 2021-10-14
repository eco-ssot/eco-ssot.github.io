import { render } from '@testing-library/react';

import Tag from '../../components/tag/Tag';

test('Tag', () => {
  const { asFragment } = render(<Tag />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
      />
    </DocumentFragment>
  `);
});
