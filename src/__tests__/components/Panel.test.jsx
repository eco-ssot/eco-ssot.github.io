import { render } from '@testing-library/react';

import Panel from '../../components/panel/Panel';

test('Panel', () => {
  const { asFragment } = render(<Panel />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});
