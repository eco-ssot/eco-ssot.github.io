import { render } from '@testing-library/react';

import DualTag from '../../components/tag/DualTag';

test('DualTag', () => {
  const { asFragment } = render(<DualTag />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex h-8 rounded shadow px-2 bg-primary-800 border-primary-600 items-center"
      >
        <div />
        <div
          class="h-4 mx-4 border-0 border-r border-divider border-primary-600 border-r-2 h-5 ml-0"
        />
        <div />
      </div>
    </DocumentFragment>
  `);
});
