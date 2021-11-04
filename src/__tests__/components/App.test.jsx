import { waitFor } from '@testing-library/dom';
import MockDate from 'mockdate';

import { renderWithProviders } from '../../__mocks__/helpers';
import App from '../../app/App';

test('App', async () => {
  MockDate.set('2021/10/21');

  const { asFragment, queryByText } = renderWithProviders(<App />);
  await waitFor(() => expect(queryByText(/2021.01 - 06/i)).toBeInTheDocument());
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        style="position: fixed; z-index: 9999; top: 16px; left: 16px; right: 16px; bottom: 16px; pointer-events: none;"
      />
      <div
        class="fixed flex items-center justify-center inset-0 transition-all z-50 bg-gray-900 bg-opacity-50 ease-in-out duration-1000 w-screen h-screen opacity-0 invisible"
      >
        <svg
          class="animate-spin h-12 w-12 text-primary-600"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          />
        </svg>
      </div>
      <div
        class="dark:bg-gray-900 dark:text-gray-50"
      >
        <div
          class="flex px-4 bg-primary-800 shadow-lg items-center z-10 flex fixed w-full h-16"
        >
          <a
            class="flex items-center space-x-4"
            href="/"
          >
            <img
              alt="logo"
              class="h-10 w-10"
              src="/logo-64x64.png"
            />
            <div
              class="block truncate font-medium text-xl"
            >
              ESG 績效管理平台
            </div>
            <div
              class="block truncate text-unit text-sm"
            >
              Ver 0.7.13
            </div>
          </a>
          <div
            class="h-4 mx-4 border-0 border-r border-divider h-1/2"
          />
          <div
            class="mt-1 relative w-32"
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
              >
                ALL
              </span>
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
          <div
            class="h-4 mx-4 border-0 border-r border-divider h-1/2"
          />
          <div
            class="flex flex-grow space-x-4"
          >
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/home"
              >
                <span
                  class="block truncate"
                >
                  首頁
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/overview"
              >
                <span
                  class="block truncate"
                >
                  總覽比較
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/carbon"
              >
                <span
                  class="block truncate"
                >
                  碳排放量
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/renewable-energy"
              >
                <span
                  class="block truncate"
                >
                  可再生能源
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/electricity"
              >
                <span
                  class="block truncate"
                >
                  用電
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/water"
              >
                <span
                  class="block truncate"
                >
                  用水
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/unit-electricity"
              >
                <span
                  class="block truncate"
                >
                  單台用電
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/waste"
              >
                <span
                  class="block truncate"
                >
                  廢棄物
                </span>
              </a>
            </div>
            <div
              class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
            >
              <a
                class="text-current text-lg font-medium"
                href="/management"
              >
                <span
                  class="block truncate"
                >
                  後台設定
                </span>
              </a>
            </div>
          </div>
          <div
            class="h-4 mx-4 border-0 border-r border-divider h-1/2"
          />
          <div
            class="flex space-x-4 items-center"
          >
            <div
              class="block truncate"
            >
              2021年 10月 21日 00:00
            </div>
            <div
              class="block truncate"
            >
              溫度：- ºC
            </div>
            <div
              class="block truncate"
            >
              濕度：- %
            </div>
          </div>
          <div
            class="h-4 mx-4 border-0 border-r border-divider h-1/2"
          />
          <div
            class="block truncate"
          >
            dummy
          </div>
        </div>
        <div
          class="pt-16"
        >
          <div
            class="grid grid-rows-3 grid-cols-3 p-4 pt-20 -mt-16 gap-4 h-screen w-screen overflow-hidden"
          >
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-3"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/overview"
                >
                  各數值 Overview
                </a>
                <div
                  class="w-auto h-8 items-center flex rounded shadow bg-primary-800"
                >
                  <div
                    class="pl-3"
                  >
                    累計區間：
                    <span
                      class="text-lg font-medium"
                    >
                      2021.01 - 06
                    </span>
                  </div>
                  <div
                    class="h-4 mx-4 border-0 border-r border-divider border-primary-600"
                  />
                  <label
                    class="font-medium"
                    id="headlessui-listbox-label-2"
                  >
                    對比年度：
                  </label>
                  <div
                    class="relative"
                  >
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-labelledby="headlessui-listbox-label-2 headlessui-listbox-button-3"
                      class="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer"
                      id="headlessui-listbox-button-3"
                      type="button"
                    >
                      <div
                        class="block truncate"
                      >
                        2020
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
                        營業額
                      </div>
                      <div
                        class="text-unit"
                      >
                        (十億台幣)
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
                        7%
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
                          2020
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          324
                        </div>
                      </div>
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
                          345
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
                        用電量
                      </div>
                      <div
                        class="text-unit"
                      >
                        (千度)
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
                        9%
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
                          2020
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          194,027
                        </div>
                      </div>
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
                          176,962
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
                        碳排量
                      </div>
                      <div
                        class="text-unit"
                      >
                        (公噸)
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
                        12%
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
                          2020
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          145,700
                        </div>
                      </div>
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
                          127,562
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
                        用水量
                      </div>
                      <div
                        class="text-unit"
                      >
                        (千噸)
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
                        10%
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
                          2020
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          2,021
                        </div>
                      </div>
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
                          1,823
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
                        廢棄物
                      </div>
                      <div
                        class="text-unit"
                      >
                        (公噸)
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
                        2%
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
                          2020
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          18,505
                        </div>
                      </div>
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
                          18,193
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
                        總節電量
                      </div>
                      <div
                        class="text-unit"
                      >
                        (千度)
                      </div>
                    </div>
                    <div
                      class="h-1/2 flex items-center space-x-2 justify-center border-b border-primary-600"
                    >
                      <div
                        class="text-4xl font-bold undefined"
                      >
                        3,956
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
                          數位化
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          555
                        </div>
                      </div>
                      <div
                        class="flex justify-between w-full items-center px-4"
                      >
                        <div
                          class="text-unit"
                        >
                          技改及管理
                        </div>
                        <div
                          class="text-2xl font-medium"
                        >
                          3,401
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-2"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/carbon"
                >
                  碳排放量
                </a>
              </div>
              <div
                class="flex-grow"
              >
                <div
                  class="flex w-full h-full items-center justify-around"
                >
                  <div
                    class="grid flex w-3/5 h-full"
                  >
                    <div />
                  </div>
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
                        基準年
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
                        目標 : 下降 21 %
                      </div>
                    </div>
                    <div>
                      單位：公噸
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-1"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/renewable-energy"
                >
                  可再生能源占比
                </a>
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
                      class="grid w-full h-full"
                    >
                      <div />
                    </div>
                    <div
                      class="absolute text-center text-lg font-medium"
                    >
                      <div
                        class="text-_orange"
                      >
                        Target : &gt; 60%
                      </div>
                      <div>
                        Actual : 1.7%
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
                          不可再生能源
                        </div>
                        <div>
                          98.3%
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
                          自建太陽能
                        </div>
                        <div>
                          1.7%
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
                          綠證
                        </div>
                        <div>
                          0.0%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-2"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/electricity"
                >
                  用電強度
                </a>
              </div>
              <div
                class="flex-grow"
              >
                <div
                  class="flex w-full h-full items-center justify-around"
                >
                  <div
                    class="grid w-3/5 h-full"
                  >
                    <div />
                  </div>
                  <div
                    class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
                  >
                    <div
                      class="flex items-center space-x-2"
                    >
                      <div
                        class="h-3 w-3 rounded-full bg-_orange"
                      />
                      <div
                        class=""
                      >
                        目標 : 下降 2 %
                      </div>
                    </div>
                    <div>
                      單位：千度/十億台幣
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-2"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/water"
                >
                  用水強度
                </a>
              </div>
              <div
                class="flex-grow"
              >
                <div
                  class="flex w-full h-full items-center justify-around"
                >
                  <div
                    class="grid w-3/5 h-full"
                  >
                    <div />
                  </div>
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
                        基準年
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
                        目標 : 下降 9 %
                      </div>
                    </div>
                    <div>
                      單位：千噸/十億台幣
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-2"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/unit-electricity"
                >
                  單台用電
                </a>
              </div>
              <div
                class="flex-grow"
              >
                <div
                  class="flex w-full h-full items-center justify-around"
                >
                  <div
                    class="grid w-3/5 h-full"
                  >
                    <div />
                  </div>
                  <div
                    class="flex flex-col h-full justify-center items-start space-y-4 text-lg"
                  >
                    <div
                      class="flex items-center space-x-2"
                    >
                      <div
                        class="h-3 w-3 rounded-full bg-_orange"
                      />
                      <div
                        class=""
                      >
                        目標 : 下降 3 %
                      </div>
                    </div>
                    <div>
                      單位：度/台
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="bg-primary-900 rounded shadow p-4 h-full flex flex-col space-y-2 row-span-1 col-span-1 pb-2"
            >
              <div
                class="h-auto flex justify-between"
              >
                <a
                  class="text-xl font-medium text-gray-100 hover:text-gray-50"
                  href="/waste"
                >
                  廢棄物產生密度
                </a>
              </div>
              <div
                class="flex-grow"
              >
                <div
                  class="flex w-full h-full items-center justify-around"
                >
                  <div
                    class="grid w-3/5 h-full"
                  >
                    <div />
                  </div>
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
                        基準年
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
                        目標 : 下降 2 %
                      </div>
                    </div>
                    <div>
                      單位：公噸/十億台幣
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);

  MockDate.reset();
});
