import { render } from '@testing-library/react';

import ManagementSkeleton from './ManagementSkeleton';

test('ManagementSkeleton', () => {
  const { container } = render(<ManagementSkeleton />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="grid grid-cols-6 grid-rows-2 max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full p-4 gap-4 overflow-hidden"
    >
      <div
        class="row-span-2 col-span-1"
      >
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col"
        />
      </div>
      <div
        class="row-span-1 col-span-5"
      >
        <div
          class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
        />
      </div>
      <div
        class="row-span-1 col-span-2"
      >
        <div
          class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
        />
      </div>
      <div
        class="row-span-1 col-span-3"
      >
        <div
          class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
        />
      </div>
    </div>
  `);
});
