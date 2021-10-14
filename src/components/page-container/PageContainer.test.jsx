import { render } from '@testing-library/react';

import PageContainer from './PageContainer';

test('PageContainer', () => {
  const { container } = render(<PageContainer />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="h-auto w-full p-4"
    >
      <div
        class="bg-primary-900 rounded h-[calc(100vh-6rem)] p-4"
      />
    </div>
  `);
});
