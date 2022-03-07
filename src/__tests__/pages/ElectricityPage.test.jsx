import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import ElectricityHistoryTable from '../../pages/electricity/ElectricityHistoryTable';
import ElectricityPage from '../../pages/electricity/ElectricityPage';

describe('ElectricityPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<ElectricityPage />);
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
                目標 : 對比去年下降 2 %
              </div>
            </div>
            <div
              class="h-6"
            />
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
                      colspan="3"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        electricityPage:table.electricity.header
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
                        electricityPage:table.revenue.header
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
                        electricityPage:table.revenueElectricity.header
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
                        electricityPage:table.asp.header
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
                      2021 (a)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022 (b)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      electricityPage:table.electricity.delta
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021 (c)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022 (d)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      electricityPage:table.revenue.delta
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021 (e=a/c)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022 (f=b/d)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      electricityPage:table.revenueElectricity.delta
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2021 (g)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      2022 (h)
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      electricityPage:table.asp.delta
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
                      1
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1
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
                      3,615,726
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,954,518
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -46%
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
                      3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1
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
                      1,832,878
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,969,715
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2 "
                        href="/electricity/analysis?site=WOK"
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
                          62%
                        </div>
                      </a>
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
                      8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -69%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      415,714
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      478,317
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=" cursor-pointer"
                      >
                        <div
                          class="text-dangerous-500 font-semibold underline"
                        >
                          15%
                        </div>
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
                      10
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      15
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        41%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      767,074
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      584,175
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -24%
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
                      9
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
                      288,736
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
                      3
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
                      182,605
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
                      2
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1
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
                      868,504
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      689,976
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -21%
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
                      2
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        50%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      535,560
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      436,862
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -18%
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
                      16
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      19
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
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      134,863
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      141,956
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <a
                        class="flex items-center justify-end space-x-2 "
                        href="/electricity/analysis?site=WCD"
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
                          5%
                        </div>
                      </a>
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
                      54
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
                      <div
                        class=""
                      >
                        -21%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      522,311
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      462,389
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -11%
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

describe('ElectricityHistoryTable', () => {
  test('ytm', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <ElectricityHistoryTable startYear="2020" endYear="2022" monthType="YTM" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/577,366/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 2 %
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
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
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
                  3,758,393
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
                  3,363,853
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -10%
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
                  1,649,359
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
                  2,772,145
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  68%
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
                  453,354
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
                  429,545
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -5%
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
                  1,009,254
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
                  841,736
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
                  240,967
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
                  310,442
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
                  150,995
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
                  159,442
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
                  1,119,730
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
                  966,183
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -14%
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
                  317,579
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
                  278,447
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -12%
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
                  165,349
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
                  142,550
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -14%
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
                  577,366
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
                  464,974
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -19%
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

  test('single', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <ElectricityHistoryTable startYear="2020" endYear="2022" monthType="single" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/476,913/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 2 %
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
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  electricityPage:history.delta
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
                  3,474,202
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
                  2,859,136
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -18%
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
                  2,927,412
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
                  3,453,998
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  18%
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
                  385,165
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
                  518,649
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  35%
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
                  732,438
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
                  592,011
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -19%
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
                  225,950
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
                  219,534
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -3%
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
                  95,812
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
                  141,857
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  48%
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
                  821,326
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
                  827,300
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1%
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
                  438,131
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
                  147,335
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -66%
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
                  145,805
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
                  118,491
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -19%
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
                  476,913
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
                  332,957
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
            </tbody>
          </table>
        </div>
      </DocumentFragment>
    `);
  });

  test('same year', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <ElectricityHistoryTable startYear="2021" endYear="2021" startMonth="1" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/522,311/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 2 %
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                    electricityPage:history.electricity
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
                  3,615,726
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,190,478
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,513,673
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,568,827
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  4,072,856
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,408,763
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,851,297
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,614,473
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,098,665
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,009,861
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,830,133
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,859,136
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
                  1,832,878
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,520,578
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,618,212
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,493,214
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,377,628
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,735,489
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,889,727
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,185,647
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,244,205
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,586,958
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,759,210
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,453,998
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
                  415,714
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  410,553
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  317,058
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  398,090
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  441,276
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  466,879
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  610,043
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  669,717
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  482,661
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  345,508
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  274,847
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  518,649
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
                  767,074
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  899,260
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  773,861
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  861,472
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  955,519
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  948,226
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,018,024
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  998,533
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  900,921
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  856,261
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  675,381
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  592,011
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
                  288,736
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  304,801
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  305,566
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  274,302
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  355,196
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  320,087
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  381,100
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  405,782
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  339,101
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  364,829
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  241,825
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  219,534
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
                  868,504
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,041,872
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  962,424
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,092,627
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,292,367
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  904,750
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  824,963
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  957,441
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  989,308
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  979,984
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,011,370
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  827,300
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
                  182,605
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  124,046
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  151,169
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  123,041
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  123,299
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  203,720
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  222,822
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  237,277
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  180,048
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  180,613
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  115,953
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  141,857
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
                  535,560
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  362,073
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  259,793
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  273,715
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  494,363
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  322,684
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  388,641
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  393,718
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  303,728
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  380,802
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  199,768
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  147,335
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
                  134,863
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  159,937
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  178,502
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  143,307
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  167,891
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  174,615
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  144,143
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  170,010
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  131,714
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  111,415
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  126,849
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  118,491
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
                  522,311
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  529,283
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  496,738
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  480,589
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  559,450
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  582,735
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  576,274
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  623,030
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  487,281
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  414,710
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  369,771
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  332,957
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
