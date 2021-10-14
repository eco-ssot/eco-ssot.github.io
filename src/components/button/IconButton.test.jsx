import { render } from '@testing-library/react';

import IconButton from './IconButton';

test('IconButton', () => {
  const { container } = render(<IconButton />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <button
      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 bg-transparent focus:outline-none"
      type="button"
    >
      <div />
    </button>
  `);
});

test('IconButton disabled', () => {
  const { container } = render(<IconButton disabled />);
  expect(container.firstChild).toHaveClass('cursor-not-allowed');
  expect(container.firstChild.firstChild).toHaveClass('opacity-50');
});
