import { render } from '@testing-library/react';

import GhostSelect from '../../components/select/GhostSelect';

test('GhostSelect', () => {
  const { asFragment } = render(<GhostSelect />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="mt-1 relative"
      >
        <button
          aria-expanded="false"
          aria-haspopup="true"
          class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800"
          id="headlessui-listbox-button-1"
          type="button"
        >
          <span
            class="block truncate text-lg"
          />
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              aria-hidden="true"
              class="h-5 w-5 text-gray-50"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                fill-rule="evenodd"
              />
            </svg>
          </span>
        </button>
      </div>
    </DocumentFragment>
  `);
});
