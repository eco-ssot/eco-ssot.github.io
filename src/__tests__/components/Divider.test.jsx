import { render } from '@testing-library/react';

import Divider from '../../components/divider/Divider';

test('Divider', () => {
  const { asFragment } = render(<Divider />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="h-4 mx-4 border-0 border-r border-divider"
      />
    </DocumentFragment>
  `);
});
