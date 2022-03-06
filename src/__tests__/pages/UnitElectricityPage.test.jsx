import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import UnitElectricityHistoryTable from '../../pages/unit-electricity/UnitElectricityHistoryTable';
import UnitElectricityPage from '../../pages/unit-electricity/UnitElectricityPage';

describe('UnitElectricityPage', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<UnitElectricityPage />);
    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/-76%/)).toBeInTheDocument());
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
                目標 : 對比去年下降 5 %
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
                      colspan="3"
                      role="columnheader"
                    >
                      <div
                        class="border-b border-divider py-3"
                      >
                        unitElectricityPage:table.electricity.header
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
                        unitElectricityPage:table.production.header
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
                        unitElectricityPage:table.unitElectricity.header
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
                      unitElectricityPage:table.electricity.delta
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
                      unitElectricityPage:table.production.delta
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
                      unitElectricityPage:table.unitElectricity.delta
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
                      873,150
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      881,872
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
                      2.8
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
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -35%
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
                      926,063
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      667,713
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -28%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -9%
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
                      1,178,929
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      442,410
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        -62%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3.0
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.9
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-dangerous-500 font-semibold"
                      >
                        -4%
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
                      3,447,909
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      18,411,570
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        434%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2.3
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
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -80%
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
                      32,466
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
                      76.1
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
                      30,946
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
                      15.9
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
                      177,932
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1,012,465
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        469%
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
                      0.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -91%
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
                      234,361
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      271,466
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        16%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      5.8
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-dangerous-500 font-semibold"
                      >
                        5%
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
                      1,491,624
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,955,076
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        98%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      1.5
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      0.9
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class="text-green-500 font-semibold"
                      >
                        -39%
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
                      8,393,380
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      24,642,572
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      <div
                        class=""
                      >
                        194%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      3.4
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
                        class="text-green-500 font-semibold"
                      >
                        -76%
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

describe('UnitElectricityHistoryTable', () => {
  it('ytm', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <UnitElectricityHistoryTable startYear="2020" endYear="2022" monthType="YTM" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/-14%/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 5 %
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
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
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
                  2
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
                  4
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
                  6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  54%
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
                  3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -20%
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
                  3
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
                  101
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
                  72
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -29%
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
                  14
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
                  19
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  36%
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
                  7
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
                  9
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  38%
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
                  3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -6%
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
                  2
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
                  2
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
                  4
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
                  3
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
            </tbody>
          </table>
        </div>
      </DocumentFragment>
    `);
  });

  it('single', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <UnitElectricityHistoryTable startYear="2020" endYear="2022" monthType="single" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/-20%/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 5 %
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
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.unitElectricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  unitElectricityPage:history.delta
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
                  2
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
                  WOK
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5
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
                  5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -2%
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
                  2
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
                  2
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -4%
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
                  54
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
                  106
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  95%
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
                  15
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
                  13
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -8%
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
                  6
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
                  8
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  30%
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -54%
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
                  2
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
                  1
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -20%
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
      <UnitElectricityHistoryTable startYear="2021" endYear="2021" startMonth="1" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/113/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 對比去年下降 5 %
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                    unitElectricityPage:history.unitElectricity
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
                  3
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
                  3
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
                  2
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
                  3
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
                  2
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2
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
                  6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6
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
                  6
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
                  6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  6
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  7
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5
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
                  3
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
                  2
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
                  3
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
                  4
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
                  3
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2
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
                  2
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
                  3
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
                  3
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
                  3
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
                  3
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2
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
                  76
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
                  46
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
                  79
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
                  113
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
                  74
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
                  53
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  106
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
                  9
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
                  8
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
                  10
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
                  12
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
                  9
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
                  8
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  8
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
                  16
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  13
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  13
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  13
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  21
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
                  27
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
                  26
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
                  17
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  13
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
                  5
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
                  2
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
                  3
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
                  3
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
                  3
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
                  2
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
                  1
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
                  2
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
                  2
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
                  2
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1
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
                  3
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
                  3
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
                  4
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
                  4
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
                  3
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
                  3
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2
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
