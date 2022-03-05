import { render } from '@testing-library/react';

import FileInput from '../../components/input/FileInput';

test('FileInput', () => {
  const { asFragment } = render(<FileInput />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <input
        class="bg-transparent border border-divider rounded px-2 py-1 focus:outline-none focus:ring-1 hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600"
        placeholder=""
        type="file"
        value=""
      />
    </DocumentFragment>
  `);
});
