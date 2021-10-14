import { render } from '@testing-library/react';

import HomeSkeleton from '../../components/skeleton/HomeSkeleton';

test('HomeSkeleton', () => {
  const { asFragment } = render(<HomeSkeleton />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden"
      >
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
        <div
          class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1"
        >
          <div
            class="h-auto flex justify-between"
          />
          <div
            class="flex-grow"
          />
        </div>
      </div>
    </DocumentFragment>
  `);
});
