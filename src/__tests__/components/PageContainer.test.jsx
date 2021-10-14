import { render } from '@testing-library/react';

import PageContainer from '../../components/page-container/PageContainer';

test('PageContainer', () => {
  const { asFragment } = render(<PageContainer />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="h-auto w-full p-4"
      >
        <div
          class="bg-primary-900 rounded h-[calc(100vh-6rem)] p-4"
        />
      </div>
    </DocumentFragment>
  `);
});
