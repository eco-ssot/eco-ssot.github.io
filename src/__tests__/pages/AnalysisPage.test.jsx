import { waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../__mocks__/helpers';
import ElectricityAnalysisPage from '../../pages/electricity/ElectricityAnalysisPage';
import WasteAnalysisPage from '../../pages/waste/WasteAnalysisPage';
import WaterAnalysisPage from '../../pages/water/WaterAnalysisPage';

describe('ElectricityAnalysisPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<ElectricityAnalysisPage />);
    await waitFor(() => expect(getByText(/840,478/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/用電強度超標/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden"
        >
          <div
            class="text-xl font-medium"
          >
            analysisPage:electricity.title (Plant: -)
          </div>
          <div
            class="flex justify-between items-end"
          >
            <div
              class="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <div>
                analysisPage:backDesc
              </div>
            </div>
            <div
              class="flex items-center space-x-2"
            >
              <div
                class="text-gray-300"
              >
                analysisPage:aspDesc
              </div>
              <div
                class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
              >
                common:accumulationRange : 
                <span
                  class="text-lg font-medium"
                >
                  2022.01 - 01
                </span>
              </div>
            </div>
          </div>
          <div
            class="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto"
          >
            <div
              class="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5"
            >
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:electricity.electricity.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:electricity.electricity.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    42%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      840,478
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      484,191
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:electricity.revenue.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:electricity.revenue.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    75%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      2
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      1
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:electricity.electricityIntensity.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:electricity.electricityIntensity.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    131%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      396,383
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      915,188
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:electricity.shipment.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:electricity.shipment.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    67%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      287
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      94
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    ASP
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:electricity.asp.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    24%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      7.39
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      5.61
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full"
            >
              <div
                class="flex justify-between"
              >
                <div
                  class="text-xl font-medium"
                >
                  analysisPage:missingTargetDesc
                </div>
                <div
                  class="flex space-x-4 items-center"
                >
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-_yellow"
                    />
                    <div
                      class=""
                    >
                      analysisPage:aboutToOverdue
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-dangerous-700"
                    />
                    <div
                      class=""
                    >
                      analysisPage:overdue
                    </div>
                  </div>
                  <button
                    class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 flex items-center space-x-1"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                    analysisPage:addDesc
                  </button>
                </div>
              </div>
              <div
                class="w-full shadow overflow-auto rounded-t-lg flex flex-col flex-grow"
              >
                <div
                  class="grid grid-cols-12 grid-rows-1 text-lg bg-primary-800 items-center py-3 tracking-wider gap-2 px-2 font-medium"
                >
                  <div
                    class="col-span-1 text-center"
                  >
                    No.
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:missingTargetDesc
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:electricity.tableTitle
                  </div>
                  <div
                    class="col-span-1 text-center"
                  >
                    common:edit
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 text-lg items-center border-b border-divider"
                >
                  <div
                    class="col-span-1 text-center h-full flex flex-col justify-center"
                  >
                    1
                  </div>
                  <div
                    class="col-span-11 grid grid-cols-11 items-center border-l border-primary-600 gap-x-2"
                  >
                    <div
                      class="col-span-5 px-4 py-3"
                    >
                      用電強度超標
                    </div>
                    <div
                      class="col-span-5 px-4"
                    >
                      5 %
                    </div>
                    <div
                      class="col-span-1 pr-3 text-center space-x-2"
                    >
                      <button
                        aria-label="icon-button-pencil"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
                        type="button"
                      >
                        <div>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                        </div>
                      </button>
                      <button
                        aria-label="icon-button-trash"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div
                      class="col-span-11"
                    >
                      <div
                        aria-expanded="false"
                        class="grid grid-cols-11 items-center w-full py-2 font-medium text-left text-primary-600 bg-primary-600 bg-opacity-10 cursor-pointer gap-2 px-2 tracking-wider border-t border-b border-primary-600"
                        id="headlessui-disclosure-button-1"
                        type="button"
                      >
                        <div
                          class="flex space-x-2 items-center col-span-2"
                        >
                          <svg
                            class="false w-5 h-5 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              fill-rule="evenodd"
                            />
                          </svg>
                          <div
                            class=""
                          >
                            analysisPage:table.strategy
                          </div>
                        </div>
                        <div
                          class="flex col-span-3 space-x-2"
                        >
                          <div
                            class="w-32"
                          >
                            analysisPage:table.category
                          </div>
                          <div>
                            analysisPage:table.expect
                          </div>
                        </div>
                        <div
                          class="col-span-1"
                        >
                          analysisPage:table.contribution
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          D.D
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          analysisPage:table.finishDate
                        </div>
                        <div
                          class="col-span-2 text-center"
                        >
                          PIC
                        </div>
                        <div
                          class="col-span-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col"
            >
              <div
                class="text-xl font-medium"
              >
                analysisPage:electricity.chartTitle
              </div>
              <div
                class="flex justify-end space-x-4"
              >
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_yellow"
                  />
                  <div
                    class=""
                  >
                    common:baseYear
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_orange"
                  />
                  <div
                    class=""
                  >
                    目標 : 對比去年下降 2 %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('WaterAnalysisPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<WaterAnalysisPage />);
    await waitFor(() => expect(getByText(/221,384/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/1234 %/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden"
        >
          <div
            class="text-xl font-medium"
          >
            analysisPage:water.title (Plant: -)
          </div>
          <div
            class="flex justify-between items-end"
          >
            <div
              class="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <div>
                analysisPage:backDesc
              </div>
            </div>
            <div
              class="flex items-center space-x-2"
            >
              <div
                class="text-gray-300"
              >
                analysisPage:aspDesc
              </div>
              <div
                class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
              >
                common:accumulationRange : 
                <span
                  class="text-lg font-medium"
                >
                  2022.01 - 01
                </span>
              </div>
            </div>
          </div>
          <div
            class="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto"
          >
            <div
              class="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5"
            >
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:water.water.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:water.water.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    36%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      221,384
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      300,810
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:water.revenue.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:water.revenue.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    84%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      2
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      5
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:water.waterIntensity.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:water.waterIntensity.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    26%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      90,097
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      66,456
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:water.shipment.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:water.shipment.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    50%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      5,846
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      8,772
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    ASP
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:water.asp.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    23%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      0.42
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      0.52
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full"
            >
              <div
                class="flex justify-between"
              >
                <div
                  class="text-xl font-medium"
                >
                  analysisPage:missingTargetDesc
                </div>
                <div
                  class="flex space-x-4 items-center"
                >
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-_yellow"
                    />
                    <div
                      class=""
                    >
                      analysisPage:aboutToOverdue
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-dangerous-700"
                    />
                    <div
                      class=""
                    >
                      analysisPage:overdue
                    </div>
                  </div>
                  <button
                    class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 flex items-center space-x-1"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                    analysisPage:addDesc
                  </button>
                </div>
              </div>
              <div
                class="w-full shadow overflow-auto rounded-t-lg flex flex-col flex-grow"
              >
                <div
                  class="grid grid-cols-12 grid-rows-1 text-lg bg-primary-800 items-center py-3 tracking-wider gap-2 px-2 font-medium"
                >
                  <div
                    class="col-span-1 text-center"
                  >
                    No.
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:missingTargetDesc
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:water.tableTitle
                  </div>
                  <div
                    class="col-span-1 text-center"
                  >
                    common:edit
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 text-lg items-center border-b border-divider"
                >
                  <div
                    class="col-span-1 text-center h-full flex flex-col justify-center"
                  >
                    1
                  </div>
                  <div
                    class="col-span-11 grid grid-cols-11 items-center border-l border-primary-600 gap-x-2"
                  >
                    <div
                      class="col-span-5 px-4 py-3"
                    >
                      1234
                    </div>
                    <div
                      class="col-span-5 px-4"
                    >
                      1234 %
                    </div>
                    <div
                      class="col-span-1 pr-3 text-center space-x-2"
                    >
                      <button
                        aria-label="icon-button-pencil"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
                        type="button"
                      >
                        <div>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                        </div>
                      </button>
                      <button
                        aria-label="icon-button-trash"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div
                      class="col-span-11"
                    >
                      <div
                        aria-expanded="false"
                        class="grid grid-cols-11 items-center w-full py-2 font-medium text-left text-primary-600 bg-primary-600 bg-opacity-10 cursor-pointer gap-2 px-2 tracking-wider border-t border-b border-primary-600"
                        id="headlessui-disclosure-button-3"
                        type="button"
                      >
                        <div
                          class="flex space-x-2 items-center col-span-3"
                        >
                          <svg
                            class="false w-5 h-5 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              fill-rule="evenodd"
                            />
                          </svg>
                          <div
                            class=""
                          >
                            analysisPage:table.strategy
                          </div>
                        </div>
                        <div
                          class="col-span-2"
                        >
                          analysisPage:table.expect
                        </div>
                        <div
                          class="col-span-1"
                        >
                          analysisPage:table.contribution
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          D.D
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          analysisPage:table.finishDate
                        </div>
                        <div
                          class="col-span-2 text-center"
                        >
                          PIC
                        </div>
                        <div
                          class="col-span-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col"
            >
              <div
                class="text-xl font-medium"
              >
                analysisPage:water.chartTitle
              </div>
              <div
                class="flex justify-end space-x-4"
              >
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_yellow"
                  />
                  <div
                    class=""
                  >
                    common:baseYear
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_orange"
                  />
                  <div
                    class=""
                  >
                    目標 : 對比2016年下降 9 %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('WasteAnalysisPage', () => {
  test('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<WasteAnalysisPage />);
    await waitFor(() => expect(getByText(/1,481.51/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/1234 %/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="flex flex-col p-4 gap-4 w-screen max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] overflow-hidden"
        >
          <div
            class="text-xl font-medium"
          >
            analysisPage:waste.title (Plant: -)
          </div>
          <div
            class="flex justify-between items-end"
          >
            <div
              class="flex text-gray-300 cursor-pointer space-x-2 items-center hover:text-green-50"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 19l-7-7 7-7"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <div>
                analysisPage:backDesc
              </div>
            </div>
            <div
              class="flex items-center space-x-2"
            >
              <div
                class="text-gray-300"
              >
                analysisPage:aspDesc
              </div>
              <div
                class="flex h-8 items-center rounded shadow px-2 bg-primary-800 border-l-4 border-primary-600"
              >
                common:accumulationRange : 
                <span
                  class="text-lg font-medium"
                >
                  2022.01 - 01
                </span>
              </div>
            </div>
          </div>
          <div
            class="grid grid-rows-5 grid-cols-7 flex-grow gap-4 overflow-auto"
          >
            <div
              class="row-span-2 col-span-7 bg-primary-900 rounded shadow py-8 grid h-full w-full divide-x divide-divider grid-cols-5"
            >
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:waste.waste.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:waste.waste.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform -rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    15%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      1,481.51
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      1,252.59
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:waste.revenue.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:waste.revenue.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    84%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      2
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      5
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:waste.wasteDensity.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:waste.wasteDensity.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-dangerous-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-dangerous-700"
                  >
                    35.63%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      204.03
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      276.73
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    analysisPage:waste.shipment.title
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:waste.shipment.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    50%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      5,846
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      8,772
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="h-full flex flex-col justify-between px-8"
              >
                <div
                  class="flex space-x-2 items-baseline"
                >
                  <div
                    class="text-xl"
                  >
                    ASP
                  </div>
                  <div
                    class="text-unit"
                  >
                    analysisPage:waste.asp.unit
                  </div>
                </div>
                <div
                  class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                >
                  <svg
                    class="transform rotate-45 w-14 h-14 text-primary-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                  <div
                    class="text-4xl font-bold text-primary-500"
                  >
                    23%
                  </div>
                </div>
                <div
                  class="space-y-2 py-2"
                >
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2021 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      0.42
                    </div>
                  </div>
                  <div
                    class="flex justify-between w-full items-center px-4"
                  >
                    <div
                      class="text-unit"
                    >
                      2022 YTM
                    </div>
                    <div
                      class="text-2xl font-medium"
                    >
                      0.52
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-5 bg-primary-900 rounded shadow p-4 space-y-4 flex flex-col h-full"
            >
              <div
                class="flex justify-between"
              >
                <div
                  class="text-xl font-medium"
                >
                  analysisPage:missingTargetDesc
                </div>
                <div
                  class="flex space-x-4 items-center"
                >
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-_yellow"
                    />
                    <div
                      class=""
                    >
                      analysisPage:aboutToOverdue
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-dangerous-700"
                    />
                    <div
                      class=""
                    >
                      analysisPage:overdue
                    </div>
                  </div>
                  <button
                    class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 flex items-center space-x-1"
                    type="button"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 4v16m8-8H4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                    analysisPage:addDesc
                  </button>
                </div>
              </div>
              <div
                class="w-full shadow overflow-auto rounded-t-lg flex flex-col flex-grow"
              >
                <div
                  class="grid grid-cols-12 grid-rows-1 text-lg bg-primary-800 items-center py-3 tracking-wider gap-2 px-2 font-medium"
                >
                  <div
                    class="col-span-1 text-center"
                  >
                    No.
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:missingTargetDesc
                  </div>
                  <div
                    class="col-span-5"
                  >
                    analysisPage:waste.tableTitle
                  </div>
                  <div
                    class="col-span-1 text-center"
                  >
                    common:edit
                  </div>
                </div>
                <div
                  class="grid grid-cols-12 text-lg items-center border-b border-divider"
                >
                  <div
                    class="col-span-1 text-center h-full flex flex-col justify-center"
                  >
                    1
                  </div>
                  <div
                    class="col-span-11 grid grid-cols-11 items-center border-l border-primary-600 gap-x-2"
                  >
                    <div
                      class="col-span-5 px-4 py-3"
                    >
                      1234
                    </div>
                    <div
                      class="col-span-5 px-4"
                    >
                      1234 %
                    </div>
                    <div
                      class="col-span-1 pr-3 text-center space-x-2"
                    >
                      <button
                        aria-label="icon-button-pencil"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
                        type="button"
                      >
                        <div>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                        </div>
                      </button>
                      <button
                        aria-label="icon-button-trash"
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                    <div
                      class="col-span-11"
                    >
                      <div
                        aria-expanded="false"
                        class="grid grid-cols-11 items-center w-full py-2 font-medium text-left text-primary-600 bg-primary-600 bg-opacity-10 cursor-pointer gap-2 px-2 tracking-wider border-t border-b border-primary-600"
                        id="headlessui-disclosure-button-5"
                        type="button"
                      >
                        <div
                          class="flex space-x-2 items-center col-span-3"
                        >
                          <svg
                            class="false w-5 h-5 text-primary-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                              fill-rule="evenodd"
                            />
                          </svg>
                          <div
                            class=""
                          >
                            analysisPage:table.strategy
                          </div>
                        </div>
                        <div
                          class="col-span-2"
                        >
                          analysisPage:table.expect
                        </div>
                        <div
                          class="col-span-1"
                        >
                          analysisPage:table.contribution
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          D.D
                        </div>
                        <div
                          class="col-span-1 text-center"
                        >
                          analysisPage:table.finishDate
                        </div>
                        <div
                          class="col-span-2 text-center"
                        >
                          PIC
                        </div>
                        <div
                          class="col-span-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row-span-3 col-span-2 bg-primary-900 rounded shadow p-4 flex flex-col"
            >
              <div
                class="text-xl font-medium"
              >
                analysisPage:waste.chartTitle
              </div>
              <div
                class="flex justify-end space-x-4"
              >
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_yellow"
                  />
                  <div
                    class=""
                  >
                    common:baseYear
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-_orange"
                  />
                  <div
                    class=""
                  >
                    目標 : 對比2018年下降 2 %
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});
