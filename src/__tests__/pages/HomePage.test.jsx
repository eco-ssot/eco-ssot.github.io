import { waitFor } from '@testing-library/react';

import HomePage from '../../pages/home/HomePage';
import { renderWithProviders } from '../../__mocks__/helpers';

describe('HomePage', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<HomePage />);
    await waitFor(() => expect(getByText(/22,151/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/15,920/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid grid-rows-3 grid-cols-9 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden"
        >
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-8"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                overviewTitle
              </div>
              <div
                class="w-auto h-8 items-center flex rounded shadow bg-primary-800"
              >
                <div
                  class="pl-3 flex items-center"
                >
                  accumulationRange : 
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
                          01
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
                  class="h-4 mx-4 border-0 border-r border-divider border-primary-600 ml-0"
                />
                <label
                  class="font-medium"
                  id="headlessui-listbox-label-3"
                >
                  compareYear
                </label>
                <div
                  class="ml-1"
                >
                  :
                </div>
                <div
                  class="relative"
                >
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-labelledby="headlessui-listbox-label-3 headlessui-listbox-button-4"
                    class="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer"
                    id="headlessui-listbox-button-4"
                    type="button"
                  >
                    <div
                      class="block truncate"
                    >
                      2021
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
              class="flex-grow"
            >
              <div
                class="grid h-full w-full divide-x divide-divider grid-cols-6"
              >
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      revenue
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:billionNtd)
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
                      21%
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
                        2021
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        54
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        2022
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        43
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      electricityUsed
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:mwh)
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
                      30%
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
                        2021
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        28,356
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        2022
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        19,895
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      carbonEmission
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:metricTon)
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
                      28%
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
                        2021
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        22,151
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        2022
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        15,920
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      waterUsed
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:thousandTon)
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
                      59%
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
                        2021
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        290
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        2022
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        118
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      wasteEmission
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:metricTon)
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
                      13%
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
                        2021
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        2,777
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        2022
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        3,139
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="h-full px-4 flex flex-col justify-between"
                >
                  <div
                    class="flex space-x-2 items-baseline"
                  >
                    <div
                      class="text-xl"
                    >
                      electricitySaving
                    </div>
                    <div
                      class="text-unit"
                    >
                      (common:mwh)
                    </div>
                  </div>
                  <div
                    class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                  >
                    <div
                      class="text-4xl font-bold undefined"
                    >
                      -
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
                        digitization
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        -
                      </div>
                    </div>
                    <div
                      class="flex justify-between w-full items-center px-4"
                    >
                      <div
                        class="text-unit"
                      >
                        technologyImprovementAndManagement
                      </div>
                      <div
                        class="text-2xl font-medium"
                      >
                        -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="row-span-1 col-span-1 h-full bg-primary-900 rounded shadow p-4 flex flex-col justify-between"
          >
            <div
              class="text-xl font-medium text-gray-100"
            >
              dataMissing
            </div>
            <div
              class="grid grid-cols-2 overflow-y-auto max-h-[60%] "
            >
              <div
                class="text-center"
              >
                WIH
              </div>
              <div
                class="text-center"
              >
                WZS-1
              </div>
            </div>
            <div
              class="border-t border-primary-600 w-full p-2 pb-0 flex justify-center"
            >
              <a
                class="underline w-full items-center flex flex-col"
                href="/management/data-status"
              >
                <div>
                  seeDetail
                </div>
                <div>
                  onSettingsPage
                </div>
              </a>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-2"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                carbonEmission
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-around"
              >
                <div
                  class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
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
                      common:target : Baseline -  21 %
                    </div>
                  </div>
                  <div>
                    common:unit : common:metricTon
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-1"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                renewableEnergyRatio
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-between"
              >
                <div
                  class="w-1/2 h-full flex items-center justify-center"
                >
                  <div
                    class="absolute text-center text-lg font-medium"
                  >
                    <div
                      class="text-_orange"
                    >
                      Target : &gt; 60%
                    </div>
                    <div>
                      Actual : 2.3%
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col justify-center w-1/2 space-y-4"
                >
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-_blue"
                    />
                    <div
                      class="flex w-4/5 justify-between text-lg"
                    >
                      <div>
                        homePage:nonRenewableEnergy
                      </div>
                      <div>
                        97.7%
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-primary-500"
                    />
                    <div
                      class="flex w-4/5 justify-between text-lg"
                    >
                      <div>
                        homePage:solarPower
                      </div>
                      <div>
                        2.3%
                      </div>
                    </div>
                  </div>
                  <div
                    class="flex items-center space-x-2"
                  >
                    <div
                      class="h-3 w-3 rounded-full bg-unit"
                    />
                    <div
                      class="flex w-4/5 justify-between text-lg"
                    >
                      <div>
                        homePage:tRec
                      </div>
                      <div>
                        -
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-2"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                electricityIntensity
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-around"
              >
                <div
                  class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
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
                      target : Baseline -  2 %
                    </div>
                  </div>
                  <div>
                    unit : mwh / billionNtd
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-2"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                waterIntensity
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-around"
              >
                <div
                  class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
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
                      common:target : Baseline -  9 %
                    </div>
                  </div>
                  <div>
                    unit : thousandTon / billionNtd
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-2"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                unitElectricity
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-around"
              >
                <div
                  class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
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
                      common:target : Baseline -  5 %
                    </div>
                  </div>
                  <div>
                    common:unit : common:kwh / common:dai
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3 pb-2"
          >
            <div
              class="h-auto flex justify-between"
            >
              <div
                class="text-xl font-medium hover:text-gray-50"
              >
                wasteEmissionDensity
              </div>
            </div>
            <div
              class="flex-grow"
            >
              <div
                class="flex w-full h-full items-center justify-around"
              >
                <div
                  class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
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
                      baseYear
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
                      target : Baseline -  2 %
                    </div>
                  </div>
                  <div>
                    common:unit : common:metricTon / common:billionNtd
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
