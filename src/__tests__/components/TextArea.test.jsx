import { render } from '@testing-library/react';

import Textarea from '../../components/textarea/Textarea';

test('Textarea', () => {
  const { asFragment } = render(<Textarea />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <textarea
        class="bg-gray-50 bg-opacity-10 shadow-sm block w-full hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 border border-divider rounded-md bg-transparent border-opacity-50"
        rows="3"
      />
    </DocumentFragment>
  `);
});
