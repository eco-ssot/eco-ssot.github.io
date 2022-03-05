import { renderWithProviders } from '../../__mocks__/helpers';
import HistorySearch from '../../components/history-search/HistorySearch';

test('HistorySearch', () => {
  const { asFragment } = renderWithProviders(<HistorySearch />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="w-full grid grid-cols-12 py-4 items-center"
      >
        <div />
        <div
          class="flex justify-center col-span-10"
        >
          <div
            class="flex items-center"
          >
            <label
              class="block truncate font-medium text-gray-50 mr-1"
              id="headlessui-listbox-label-1"
            >
              selectLabel.searchYear : 
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-1 headlessui-listbox-button-2"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                id="headlessui-listbox-button-2"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  2020
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-gray-400"
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
          </div>
          <div
            class="flex items-center mr-8"
          >
            <label
              class="block truncate font-medium text-gray-50 mr-1"
              id="headlessui-listbox-label-3"
            >
              <svg
                class="h-5 w-5 mx-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-3 headlessui-listbox-button-4"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                id="headlessui-listbox-button-4"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  2022
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-gray-400"
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
          </div>
          <div
            class="flex items-center mr-2"
          >
            <label
              class="block truncate font-medium text-gray-50 mr-1"
              id="headlessui-listbox-label-5"
            >
              selectLabel.searchMonth : 
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-5 headlessui-listbox-button-6"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 w-48"
                id="headlessui-listbox-button-6"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  Year To Month
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-gray-400"
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
          </div>
          <div
            class="flex items-center mr-8"
          >
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 w-24"
                id="headlessui-listbox-button-7"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  12
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-gray-400"
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
          </div>
          <div
            class="flex items-center mr-8"
          >
            <label
              class="block truncate font-medium text-gray-50 mr-1"
              id="headlessui-listbox-label-8"
            >
              selectLabel.dimension : 
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-8 headlessui-listbox-button-9"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 w-36"
                id="headlessui-listbox-button-9"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  ALL
                </span>
                <span
                  class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                >
                  <svg
                    aria-hidden="true"
                    class="h-5 w-5 text-gray-400"
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
          </div>
          <button
            class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
            type="button"
          >
            button.search
          </button>
        </div>
        <div
          class="text-right"
        >
          <a
            class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
            download=""
            href="http://localhost:3000/api/undefined/download?dimension=All&endMonth=12&endYear=2022&monthType=YTM&startYear=2020"
            rel="noopener noreferrer"
            target="_blank"
          >
            Excel
          </a>
        </div>
      </div>
       
    </DocumentFragment>
  `);
});
