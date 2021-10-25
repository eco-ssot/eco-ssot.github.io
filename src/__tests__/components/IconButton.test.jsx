import { render } from '@testing-library/react';

import IconButton from '../../components/button/IconButton';

test('IconButton', () => {
  const { asFragment } = render(<IconButton />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
        type="button"
      >
        <div />
      </button>
    </DocumentFragment>
  `);
});

test('IconButton disabled', () => {
  const { container } = render(<IconButton disabled />);
  expect(container.firstChild).toHaveClass('cursor-not-allowed');
  expect(container.firstChild.firstChild).toHaveClass('opacity-50');
});
