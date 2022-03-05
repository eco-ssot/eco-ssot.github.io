import { render } from '@testing-library/react';

import AnalysisSkeleton from '../../components/skeleton/AnalysisSkeleton';

test('AnalysisSkeleton', () => {
  const { asFragment } = render(<AnalysisSkeleton />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden"
      >
        <div
          class="text-xl font-medium"
        >
          ​
        </div>
        <div
          class="flex justify-between items-end"
        >
          <div
            class="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                fill-rule="evenodd"
              />
            </svg>
            <div>
              返回上一頁
            </div>
          </div>
          <div
            class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
          >
            累計區間 : 
          </div>
        </div>
        <div
          class="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto"
        >
          <div
            class="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5"
          />
          <div
            class="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full"
          />
          <div
            class="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col"
          />
        </div>
      </div>
    </DocumentFragment>
  `);
});
