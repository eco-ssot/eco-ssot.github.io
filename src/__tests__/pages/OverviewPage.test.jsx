import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import OverviewHistoryTable from '../../pages/overview/OverviewHistoryTable';
import OverviewPage from '../../pages/overview/OverviewPage';

describe('OverviewPage', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<OverviewPage />);
    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/28,355,567/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="h-auto w-full p-4"
        >
          <div
            class="bg-primary-900 rounded h-[calc(100vh-6rem)] p-4 flex flex-col relative space-y-2"
          >
            <div
              class="text-xl font-medium"
            >
              title
            </div>
            <div
              class="flex justify-center items-end"
            >
              <div
                class="relative z-0 inline-flex shadow-sm rounded-md"
              >
                <button
                  class="relative inline-flex items-center px-4 py-2 border border-primary-800 bg-transparent text-sm font-medium text-gray-50 rounded-r-none bg-primary-800"
                  type="button"
                >
                  buttonGroup.currentYear
                </button>
                <button
                  class="relative inline-flex items-center px-4 py-2 border border-primary-800 bg-transparent text-sm font-medium text-gray-50 rounded-l-none -ml-px"
                  type="button"
                >
                  buttonGroup.historyYear
                </button>
              </div>
              <div
                class="flex absolute right-4 space-x-4"
              >
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-dangerous-500"
                  />
                  <div
                    class=""
                  >
                    component:legend.missTarget
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-green-500"
                  />
                  <div
                    class=""
                  >
                    component:legend.meetTarget
                  </div>
                </div>
                <div
                  class="bg-dangerous-900 rounded border border-dangerous-600 px-1"
                >
                  component:legend.missingData
                </div>
              </div>
            </div>
            <div
              class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4 pr-0"
            >
              common:accumulationRange : 
              <div
                class="flex items-center"
              >
                <div
                  class="relative"
                >
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    class="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer"
                    id="headlessui-listbox-button-1"
                    type="button"
                  >
                    <div
                      class="block truncate"
                    >
                      2022
                    </div>
                    <div
                      class="inset-y-0 right-0 flex pr-2 items-center pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-4 w-4 text-gray-50"
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
                    </div>
                  </button>
                </div>
                01 -
                <div
                  class="relative w-16"
                >
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    class="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer"
                    id="headlessui-listbox-button-2"
                    type="button"
                  >
                    <div
                      class="block truncate"
                    >
                      02
                    </div>
                    <div
                      class="inset-y-0 right-0 flex pr-2 items-center pointer-events-none"
                    >
                      <svg
                        aria-hidden="true"
                        class="h-4 w-4 text-gray-50"
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
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <div
              class="w-full h-6 text-right"
            >
              common:gapDesc
            </div>
            <div
              class="w-full flex flex-col shadow overflow-auto rounded-t-lg"
            >
              <table
                role="table"
              >
                <thead
                  class="bg-primary-800  sticky top-0 z-1"
                >
                  <tr
                    role="row"
                  >
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    />
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    />
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      Site
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="4"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        overviewPage:table.electricity
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="4"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        overviewPage:table.water
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="4"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        overviewPage:table.revenue
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="4"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        overviewPage:table.asp
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    />
                  </tr>
                  <tr
                    role="row"
                  >
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:weight
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:gap
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:weight
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:gap
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:weight
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      common:gap
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:weight
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      common:gap
                    </th>
                  </tr>
                </thead>
                <tbody
                  role="rowgroup"
                >
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WTZ
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,462,661
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,611,919
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -35%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      48,190
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      17,748
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      15%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -63%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.7
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            21%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.6
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      12%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        36%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WOK
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5,113,806
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3,357,608
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      17%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -34%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      52,030
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      43,981
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      37%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -15%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.1
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -59%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      15%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -40%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <svg
                          class="w-5 h-5 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WKS
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3,519,671
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,265,714
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -64%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      26,666
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      34,299
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      29%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        29%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.6
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -69%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      120%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -29%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <svg
                          class="w-5 h-5 cursor-pointer"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      <div
                        class="bg-dangerous-900 rounded border border-dangerous-600 px-1"
                      >
                        WZS
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8,017,600
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8,608,342
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      43%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        7%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      127,091
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      10.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      14.7
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      34%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            41%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      76%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        96%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider bg-gray-500 bg-opacity-50 opacity-50"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WMX
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,469,562
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4,744
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8.6
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      249.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider bg-gray-500 bg-opacity-50 opacity-50"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WCZ
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      490,880
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      350
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.7
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6,964.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      <div
                        class="bg-dangerous-900 rounded border border-dangerous-600 px-1"
                      >
                        WIH
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,539,801
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      799,043
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -48%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6,861
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.2
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -35%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      6.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -100%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WCQ
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,278,316
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,561,554
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        22%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5,895
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      12,620
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      11%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        114%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.4
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3.6
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            50%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      13.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      15.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      292%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        15%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WCD
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,224,932
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,691,072
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      14%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        21%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      14,681
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      9,088
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      8%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -38%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      16.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      19.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      44%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            15%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      15.4
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      16.7
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      319%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        8%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WHC
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      879,714
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -100%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,748
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -100%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      WNH
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      358,623
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -100%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      914
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -100%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b-2 border-t-2 border-primary-600"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2"
                      role="cell"
                    >
                      Total
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      28,355,567
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      19,895,252
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      100%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -30%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      290,170
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      117,735
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      100%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -59%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      54.3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      43.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      100%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          <div
                            class=""
                          >
                            -21%
                          </div>
                        </div>
                        <button
                          class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                          type="button"
                        >
                          <div>
                            <svg
                              class="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                              />
                            </svg>
                          </div>
                        </button>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5.2
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      100%
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        8%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                      role="cell"
                    />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('OverviewHistoryTable', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<OverviewHistoryTable year="2021" dimension="All" />);
    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/401,009,640/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="w-full h-6 text-right"
        >
          common:gapDesc
        </div>
        <div
          class="w-full flex flex-col shadow overflow-auto rounded-t-lg"
        >
          <table
            role="table"
          >
            <thead
              class="bg-primary-800  sticky top-0 z-1"
            >
              <tr
                role="row"
              >
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="1"
                  role="columnheader"
                  rowspan="2"
                />
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap"
                  colspan="1"
                  role="columnheader"
                  rowspan="2"
                />
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="1"
                  role="columnheader"
                  rowspan="2"
                >
                  Site
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="4"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    overviewPage:table.electricity
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="4"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    overviewPage:table.water
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="4"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    overviewPage:table.revenue
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="4"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    overviewPage:table.asp
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="1"
                  role="columnheader"
                  rowspan="2"
                />
              </tr>
              <tr
                role="row"
              >
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2020
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2021
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:weight
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:gap
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2020
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2021
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:weight
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:gap
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2020
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2021
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:weight
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-center"
                  colspan="1"
                  role="columnheader"
                >
                  common:gap
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2020
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  2021
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:weight
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  common:gap
                </th>
              </tr>
            </thead>
            <tbody
              role="rowgroup"
            >
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WTZ
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  23,187,298
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  34,392,042
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    48%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  484,675
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  628,227
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    30%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6.2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  10.2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        66%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.4
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    40%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WOK
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  92,194,094
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  50,960,229
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -45%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  996,876
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  619,542
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -38%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  55.9
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  18.4
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        -67%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1.1
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1.1
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -5%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                >
                  <div
                    class="flex justify-center"
                  >
                    <svg
                      class="w-5 h-5 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WKS
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  38,144,958
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  38,349,022
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    1%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  521,940
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  473,369
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -9%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  84.1
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  89.3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        6%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  8.7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  7.7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -11%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                >
                  <div
                    class="flex justify-center"
                  >
                    <svg
                      class="w-5 h-5 cursor-pointer"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 9l-7 7-7-7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WZS
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  125,079,529
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  127,112,053
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    2%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,585,360
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,632,748
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    3%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  123.9
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  151.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        22%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2.4
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2.4
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    1%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WMX
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  34,342,494
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  44,728,596
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    30%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  96,167
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  99,237
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    3%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  142.5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  144.1
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        1%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  388.6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  295.5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -24%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WIH
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  18,090,312
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  17,877,724
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -1%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  120,513
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  134,489
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    12%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  16.2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  18.5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        15%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5.9
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6.3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    6%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WCZ
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5,186,219
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6,279,234
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    21%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4,135
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4,973
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    20%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  34.3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  39.4
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        15%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5,716.9
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6,849.1
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    20%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WCQ
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  14,845,884
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  16,371,918
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    10%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  80,388
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  94,370
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    17%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  46.7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  58.8
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        26%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  11.5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  14.6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    27%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WCD
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30,530,402
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  39,699,209
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    30%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  175,529
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  253,518
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    44%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  184.6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  278.5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        51%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  15.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  16.7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    12%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WHC
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  12,510,007
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  11,043,912
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -12%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  62,980
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  56,148
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -11%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        -
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b border-divider"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  WNH
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6,898,443
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6,420,678
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -7%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  20,134
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  20,443
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    2%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        -
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
              <tr
                class="border-b-2 border-t-2 border-primary-600"
                role="row"
              >
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg"
                  role="cell"
                />
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2"
                  role="cell"
                >
                  Total
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  401,009,640
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  375,770,027
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -6%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4,148,697
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4,017,064
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    -3%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  694.6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  808.2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-center"
                  role="cell"
                >
                  <div
                    class="flex justify-end items-center space-x-2"
                  >
                    <div>
                      <div
                        class=""
                      >
                        16%
                      </div>
                    </div>
                    <button
                      class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none bg-primary-600 rounded-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 invisible"
                      type="button"
                    >
                      <div>
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4.7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6.0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  <div
                    class=""
                  >
                    27%
                  </div>
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 w-1"
                  role="cell"
                />
              </tr>
            </tbody>
          </table>
        </div>
      </DocumentFragment>
    `);
  });
});
