import { render } from '@testing-library/react';

import FileInput from '../../components/input/FileInput';

test('FileInput', () => {
  const { asFragment } = render(<FileInput />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <input
        class="bg-transparent border border-divider rounded px-2 py-1"
        placeholder=""
        type="file"
        value=""
      />
    </DocumentFragment>
  `);
});
