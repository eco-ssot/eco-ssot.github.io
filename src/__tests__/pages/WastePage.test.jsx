import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import WasteHistoryTable from '../../pages/waste/WasteHistoryTable';
import WastePage from '../../pages/waste/WastePage';

describe('WastePage', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<WastePage />);
    await waitFor(() => expect(getByText(/138.49/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/88.21/)).toBeInTheDocument());
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
              class="flex h-8 rounded shadow px-2 bg-primary-800 border-primary-600 items-center absolute top-2 right-4"
            >
              <div>
                <div
                  class="flex items-center"
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
              </div>
              <div
                class="h-4 mx-4 border-0 border-r border-divider border-primary-600 border-r-2 h-5 ml-0"
              />
              <div>
                目標 : 對比2018年下降 2 %
              </div>
            </div>
            <div
              class="w-full h-6 text-right"
            >
              wastePage:desc
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
                      colspan="2"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        wastePage:table.nonRecyclable.header
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="2"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        wastePage:table.recyclable.header
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      <div
                        class="text-right"
                      >
                        Total
                      </div>
                      <div
                        class="text-right"
                      >
                        (common:metricTon)
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      <div
                        class="text-right"
                      >
                        wastePage:table.revenue.header
                      </div>
                      <div
                        class="text-right"
                      >
                        (common:billionNtd)
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="3"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        wastePage:table.waste.header
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      <div
                        class="text-center"
                      >
                        wastePage:table.recycleRate
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
                      wastePage:table.nonRecyclable.normal
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      wastePage:table.nonRecyclable.harmful
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      wastePage:table.recyclable.normal
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      wastePage:table.recyclable.waste
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022.01 - 01
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2018
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      wastePage:table.waste.delta
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
                      0.00
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
                      0.63
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      192.38
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      193.01
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.82
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      234.03
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      225.05
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2"
                        href="/waste/analysis?site=WTZ"
                      >
                        <div
                          class="relative flex h-3 w-3"
                        >
                          <div
                            class="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 bg-dangerous-700"
                          />
                          <div
                            class="relative inline-flex rounded-full h-3 w-3 bg-dangerous-700"
                          />
                        </div>
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          3.99%
                        </div>
                      </a>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          100.00%
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
                      13.03
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
                      0.00
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      73.78
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      86.81
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.13
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      80.17
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      51.84
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2"
                        href="/waste/analysis?site=WOK"
                      >
                        <div
                          class="relative flex h-3 w-3"
                        >
                          <div
                            class="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 bg-dangerous-700"
                          />
                          <div
                            class="relative inline-flex rounded-full h-3 w-3 bg-dangerous-700"
                          />
                        </div>
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          54.64%
                        </div>
                      </a>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          81.40%
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
                      11.32
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
                      9.95
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      109.38
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      130.65
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.65
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      51.78
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      33.31
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="cursor-pointer"
                      >
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          55.43%
                        </div>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          87.09%
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
                      83.11
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
                      5.79
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,167.77
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,256.67
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      14.74
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      86.75
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      84.25
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="cursor-pointer"
                      >
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          2.97%
                        </div>
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          91.80%
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
                      16.57
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
                      34.35
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      301.72
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      352.64
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
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          95.02%
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
                      0.00
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
                      2.20
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      25.37
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      27.57
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.16
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      29.68
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      14.74
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2"
                        href="/waste/analysis?site=WIH"
                      >
                        <div
                          class="relative flex h-3 w-3"
                        >
                          <div
                            class="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 bg-dangerous-700"
                          />
                          <div
                            class="relative inline-flex rounded-full h-3 w-3 bg-dangerous-700"
                          />
                        </div>
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          101.40%
                        </div>
                      </a>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          80.22%
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
                      7.08
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
                      81.82
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      88.90
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
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          92.04%
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
                      3.26
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
                      7.10
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      454.60
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      464.96
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3.57
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      135.67
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      64.58
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2"
                        href="/waste/analysis?site=WCQ"
                      >
                        <div
                          class="relative flex h-3 w-3"
                        >
                          <div
                            class="animate-ping absolute inline-flex h-3 w-3 rounded-full opacity-75 bg-dangerous-700"
                          />
                          <div
                            class="relative inline-flex rounded-full h-3 w-3 bg-dangerous-700"
                          />
                        </div>
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          110.09%
                        </div>
                      </a>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          95.20%
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
                      4.12
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
                      28.20
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      445.38
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      477.70
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      18.96
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      25.20
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      52.75
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -52.23%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          99.14%
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
                      0.00
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
                      0.00
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.00
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.00
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
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          -
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
                      0.00
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
                      0.00
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.00
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.00
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
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          -
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
                      138.49
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
                      88.21
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,852.20
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3,078.91
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      43.03
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      72.95
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      51.43
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-dangerous-500 font-semibold"
                      >
                        41.84%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 pr-0"
                      role="cell"
                    >
                      <div
                        class="flex justify-end items-center space-x-2"
                      >
                        <div>
                          93.68%
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

describe('WasteHistoryTable', () => {
  it('ytm', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <WasteHistoryTable startYear="2020" endYear="2022" monthType="YTM" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/55/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比2018年下降 2 %
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
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.ytm
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.ytm
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.ytm
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
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
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
                  240
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
                  266
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
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
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
                  83
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
                  77
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -7%
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
                  49
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
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -37%
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
                  103
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
                  94
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -9%
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
                  32
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
                  37
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
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
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
                  42
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
                  27
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -35%
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
                  35
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
                  37
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
                  -
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
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
                  64
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
                  58
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -9%
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
                  29
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
                  26
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -9%
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
                  55
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
                  49
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -11%
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

  it('single', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <WasteHistoryTable startYear="2020" endYear="2022" monthType="single" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/44/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比2018年下降 2 %
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
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.m
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.m
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                  colspan="2"
                  role="columnheader"
                >
                  <div
                    class="border-b border-divider py-3"
                  >
                    common:history.m
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
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.waste
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  wastePage:history.delta
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
                  281
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
                  237
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -16%
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
                  -100%
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
                  115
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
                  126
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  10%
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
                  -100%
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
                  35
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
                  45
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -100%
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
                  105
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
                  80
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -23%
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
                  -100%
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
                  39
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
                  25
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -36%
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
                  -100%
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
                  37
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
                  26
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -30%
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
                  -100%
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
                  20
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
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  55%
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
                  -100%
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
                  67
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
                  48
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -28%
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
                  -100%
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
                  29
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
                  23
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -21%
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
                  -100%
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
                  0
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
                  0
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
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
                  0
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
                  0
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -
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
                  53
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
                  44
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -17%
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
                  -100%
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

  it('same year', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <WasteHistoryTable startYear="2021" endYear="2021" startMonth="1" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/112/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比2018年下降 2 %
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
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1"
                  colspan="1"
                  role="columnheader"
                  rowspan="0"
                />
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3"
                  colspan="1"
                  role="columnheader"
                  rowspan="0"
                />
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2"
                  colspan="1"
                  role="columnheader"
                  rowspan="0"
                >
                  Site
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  <div>
                    common:history.m
                  </div>
                  <div>
                    wastePage:history.waste
                  </div>
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1"
                  colspan="1"
                  role="columnheader"
                  rowspan="0"
                />
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
                  305
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  250
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  272
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  242
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  266
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  272
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  295
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  272
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  252
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  252
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  274
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  237
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
                  64
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  130
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  88
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  64
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  45
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  98
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  72
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  65
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  69
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  62
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  64
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  126
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
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  36
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  26
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  23
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  45
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
                  112
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  123
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  87
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  108
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  96
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  96
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  93
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  91
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  90
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  96
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  84
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  80
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
                  28
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  67
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  46
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  39
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  44
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  32
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  25
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
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  40
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  29
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  23
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  16
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  26
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  22
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  28
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  29
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  26
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
                  50
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  47
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  34
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  28
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  60
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  45
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  41
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  37
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  27
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  31
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
                  52
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  57
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  63
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  63
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  63
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  63
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  57
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  62
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  60
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  73
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  60
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  48
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
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  38
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  33
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  31
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  25
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  23
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  24
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  23
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
                  0
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
                  0
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
                  0
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
                  0
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
                  0
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0
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
                  0
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
                  0
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
                  0
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
                  0
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
                  0
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0
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
                  51
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  60
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  55
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  52
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  51
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  52
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  46
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  48
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  45
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  43
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  44
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  44
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
