import { render } from '@testing-library/react';

import Button from '../../components/button/Button';

test('Button', () => {
  const { asFragment } = render(<Button />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
        type="button"
      />
    </DocumentFragment>
  `);
});
