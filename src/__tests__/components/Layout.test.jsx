import MockDate from 'mockdate';

import { renderWithProviders } from '../../__mocks__/helpers';
import Layout from '../../components/layout/Layout';

test('Layout', () => {
  MockDate.set('2021-10-21T08:00:00.000Z');

  const { asFragment } = renderWithProviders(<Layout />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        aria-live="assertive"
        class="z-50 fixed inset-0 flex px-4 py-6 pointer-events-none p-6 items-start"
      >
        <div
          class="w-full flex flex-col space-y-4 items-end"
        />
      </div>
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
              2021年 10月 21日 16:00
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
        />
      </div>
    </DocumentFragment>
  `);

  MockDate.reset();
});
