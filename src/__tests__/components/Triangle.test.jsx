import { render } from '@testing-library/react';

import Triangle from '../../components/triangle/Triangle';

test('Triangle', () => {
  const { asFragment } = render(<Triangle />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="w-0 h-0 border-t-[0.25rem] border-t-transparent border-b-[0.25rem] border-b-transparent border-l-[0.5rem] border-l-primary-600"
      />
    </DocumentFragment>
  `);
});
