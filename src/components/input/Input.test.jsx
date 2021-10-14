import { render } from '@testing-library/react';

import Input from './Input';

test('Input', () => {
  const { container } = render(<Input />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <input
      class="bg-gray-50 bg-opacity-10 shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-10 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50"
      placeholder=""
      type="text"
      value=""
    />
  `);
});
