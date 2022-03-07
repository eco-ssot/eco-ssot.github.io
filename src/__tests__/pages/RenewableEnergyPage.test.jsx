import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import RenewableEnergyHistoryTable from '../../pages/renewable-energy/RenewableEnergyHistoryTable';
import RenewableEnergyPage from '../../pages/renewable-energy/RenewableEnergyPage';

describe('RenewableEnergyPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<RenewableEnergyPage />);
    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/19,895,252/)).toBeInTheDocument());
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
                目標 : 占比 &gt; 60 %
              </div>
            </div>
            <div
              class="w-full h-6 text-right"
            >
              renewableEnergyPage:ratioDesc
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
                        renewableEnergyPage:table.electricity.header
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
                        renewableEnergyPage:table.ratio.header
                      </div>
                      <div
                        class="text-right"
                      >
                        ( (b+c) / a )
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
                        renewableEnergyPage:table.tRec.header
                      </div>
                      <div
                        class="text-right"
                      >
                        ( a*60% - b )
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      renewableEnergyPage:table.roof.area
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      renewableEnergyPage:table.roof.structure
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
                      renewableEnergyPage:table.electricity.total
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      renewableEnergyPage:table.electricity.sun
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                      colspan="1"
                      role="columnheader"
                    >
                      renewableEnergyPage:table.electricity.tRec
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
                      1,611,919
                    </td>
                    <td
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
                      WOK
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
                      4,106
                    </td>
                    <td
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
                        class="text-dangerous-500 font-semibold"
                      >
                        0%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      2,010,459
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
                      1,265,714
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      82,771
                    </td>
                    <td
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
                        class="text-dangerous-500 font-semibold"
                      >
                        7%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      676,658
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
                      8,608,342
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      364,619
                    </td>
                    <td
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
                        class="text-dangerous-500 font-semibold"
                      >
                        4%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      4,800,387
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
                      0
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
                      799,043
                    </td>
                    <td
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
                      WCQ
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
                      WCD
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
                      19,895,252
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      451,495
                    </td>
                    <td
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
                        class="text-dangerous-500 font-semibold"
                      >
                        2%
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                      role="cell"
                    >
                      11,485,656
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
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('RenewableEnergyHistoryTable', () => {
  test('ytm', async () => {
    const { asFragment, getByText } = renderWithProviders(
      <RenewableEnergyHistoryTable startYear="2020" endYear="2022" monthType="YTM" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/401,009,640/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 占比 &gt; 60 %
        </div>
        <div
          class="w-full h-6 text-right"
        >
          history.desc
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
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
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
                  7%
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
                  53%
                </td>
                <td
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
                  92,194,094
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  47%
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
                  38,144,958
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
                  38,349,022
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  53%
                </td>
                <td
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
                  125,079,529
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  16%
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
                  52%
                </td>
                <td
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
                  34,342,494
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  78%
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
                  52%
                </td>
                <td
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
                  5,186,219
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
                  6,279,234
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
                  49%
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
                  53%
                </td>
                <td
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
                  14,845,884
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
                  16,371,918
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  47%
                </td>
                <td
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
                  30,530,402
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  40%
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
                  52%
                </td>
                <td
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
                  12,510,007
                </td>
                <td
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
                  6,898,443
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
                  401,009,640
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  47%
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
                  55%
                </td>
                <td
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
      <RenewableEnergyHistoryTable startYear="2020" endYear="2022" monthType="single" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/29,087,444/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 占比 &gt; 60 %
        </div>
        <div
          class="w-full h-6 text-right"
        >
          history.desc
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
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.electricity
                </th>
                <th
                  class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right"
                  colspan="1"
                  role="columnheader"
                >
                  renewableEnergyPage:history.ratio
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
                  2,358,399
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  70%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,677,395
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  678%
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
                  4,814,192
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  888%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,122,125
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  859%
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
                  3,446,393
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  755%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,698,377
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  711%
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
                  8,790,079
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  225%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  10,395,800
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  596%
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
                  2,233,830
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,200%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,815,752
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  614%
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
                  435,354
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  908%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  390,396
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  864%
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
                  1,477,604
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  606%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  1,201,563
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  795%
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
                  883,800
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  -348%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2,211,500
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  350%
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
                  2,839,162
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  430%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3,390,320
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  613%
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
                  1,095,645
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0%
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
                  712,986
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  467%
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
                  0
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0%
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
                  29,087,444
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  645%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  29,903,228
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  673%
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
      <RenewableEnergyHistoryTable startYear="2021" endYear="2021" startMonth="1" endMonth="12" dimension="All" />
    );

    await waitFor(() => expect(getByText(/Total/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/673%/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600 absolute top-2 right-4"
        >
          目標 : 占比 &gt; 60 %
        </div>
        <div
          class="w-full h-6 text-right"
        >
          history.desc
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                    renewableEnergyPage:history.ratio
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  678%
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
                  1%
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
                  1%
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
                  1%
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
                  1%
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
                  1%
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
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  859%
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
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
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
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  7%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  711%
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
                  4%
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
                  4%
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
                  4%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  3%
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
                  3%
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
                  3%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  5%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  596%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  614%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  795%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  864%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  350%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  613%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
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
                  0%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  0%
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
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
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
                  2%
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
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  2%
                </td>
                <td
                  class="py-3 text-gray-50 text-center text-lg px-2 text-right"
                  role="cell"
                >
                  673%
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
