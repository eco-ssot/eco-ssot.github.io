import { renderWithProviders } from '../../__mocks__/helpers';
import OverviewSearch from '../../components/overview-search/OverviewSearch';

test('OverviewSearch', () => {
  const { asFragment } = renderWithProviders(<OverviewSearch />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="w-full grid grid-cols-12 py-4 items-center"
      >
        <div />
        <div
          class="flex justify-center space-x-8 col-span-10"
        >
          <div
            class="flex items-center"
          >
            <label
              class="block font-medium text-gray-50"
              id="headlessui-listbox-label-1"
            >
              查詢年度：
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-1 headlessui-listbox-button-2"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800"
                id="headlessui-listbox-button-2"
                type="button"
              >
                <span
                  class="block truncate"
                >
                  2021
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
            class="flex items-center"
          >
            <label
              class="block font-medium text-gray-50"
              id="headlessui-listbox-label-3"
            >
              資料呈現：
            </label>
            <div
              class="relative"
            >
              <button
                aria-expanded="false"
                aria-haspopup="true"
                aria-labelledby="headlessui-listbox-label-3 headlessui-listbox-button-4"
                class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800 w-36"
                id="headlessui-listbox-button-4"
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
            搜尋
          </button>
        </div>
        <div
          class="text-right"
        >
          <a
            class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
            download=""
            href="https://eco-ssot-2021-ingress-api.eco-ssot-2021-dev.10.37.66.1.k8sprd-whq.k8s.wistron.com/api/undefined/download?dimension=All&year=2021"
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
