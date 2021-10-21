import { render } from '@testing-library/react';

import Popper from '../../components/popper/Popper';

test('Popper', () => {
  const { asFragment } = render(<Popper />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="relative"
      >
        <div
          aria-expanded="false"
          id="headlessui-popover-button-1"
          type="button"
        />
      </div>
    </DocumentFragment>
  `);
});
