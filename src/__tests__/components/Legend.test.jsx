import { render } from '@testing-library/react';

import Legend from '../../components/legend/Legend';

test('Legend', () => {
  const { asFragment } = render(<Legend />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});
