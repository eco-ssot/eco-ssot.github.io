import { waitFor, fireEvent } from '@testing-library/react';

import usersJson from '../../__mocks__/get/users';
import { renderWithProviders } from '../../__mocks__/helpers';
import DataStatusPage from '../../pages/management/DataStatusPage';
import GoalPage from '../../pages/management/GoalPage';
import ManagementPage from '../../pages/management/ManagementPage';
import PicPage from '../../pages/management/PicPage';

describe('ManagementPage', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<ManagementPage />);
    expect(getByText(/User Name/)).toBeInTheDocument();
    expect(getByText(/Dept \/ ID/)).toBeInTheDocument();
    expect(getByText(/Level/)).toBeInTheDocument();
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="grid grid-cols-8 grid-rows-2 max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] w-full p-4 gap-4 overflow-hidden"
        >
          <div
            class="row-span-2 col-span-1"
          >
            <div
              class="bg-primary-900 rounded shadow py-4 h-full flex flex-col"
            >
              <div
                class="flex flex-grow flex-col space-y-4 "
              >
                <div
                  class="space-y-2 pb-4 mx-4 border-b border-divider"
                >
                  <div
                    class="text-primary-600"
                  >
                    User Name
                  </div>
                  <div>
                    dummy
                  </div>
                </div>
                <div
                  class="space-y-4 pb-4 mx-4 border-b border-divider"
                >
                  <div
                    class="space-y-2"
                  >
                    <div
                      class="text-primary-600"
                    >
                      Dept / ID
                    </div>
                    <div>
                      - / dummy
                    </div>
                  </div>
                  <div
                    class="space-y-2"
                  >
                    <div
                      class="text-primary-600"
                    >
                      Level
                    </div>
                    <div>
                      developer / target_maintainer
                    </div>
                  </div>
                </div>
                <div
                  class="flex flex-col py-4 space-y-2"
                >
                  <a
                    class="flex items-center h-10 relative"
                    href="/management/goal"
                  >
                    <div
                      class="ml-4"
                    >
                      managementPage:nav.goal
                    </div>
                  </a>
                  <a
                    class="flex items-center h-10 relative"
                    href="/management/data-status"
                  >
                    <div
                      class="ml-4"
                    >
                      managementPage:nav.dataStatus
                    </div>
                  </a>
                  <a
                    class="flex items-center h-10 relative"
                    href="/management/csr"
                  >
                    <div
                      class="ml-4"
                    >
                      CSR 對照
                    </div>
                  </a>
                  <a
                    class="flex items-center h-10 relative"
                    href="/management/pic"
                  >
                    <div
                      class="ml-4"
                    >
                      managementPage:nav.pic
                    </div>
                  </a>
                  <a
                    class="flex items-center h-10 relative"
                    href="/management/version"
                  >
                    <div
                      class="ml-4"
                    >
                      版本異動
                    </div>
                  </a>
                </div>
              </div>
              <div
                class="border-t border-divider text-center mx-4"
              >
                <button
                  class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 mt-4"
                  type="button"
                >
                  component:button.logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('Goal Page', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<GoalPage canEdit={true} />);
    await waitFor(() => expect(getByText(/2,150.4/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/241,772/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="row-span-1 col-span-7"
        >
          <div
            class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
          >
            <div
              class="flex justify-between"
            >
              <div
                class="text-xl font-medium"
              >
                managementPage:yearGoal.title
              </div>
              <div
                class="flex items-center"
              >
                <div
                  class="flex items-center"
                >
                  <label
                    class="block truncate font-medium text-gray-50 mr-1"
                    id="headlessui-listbox-label-1"
                  >
                    component:selectLabel.searchYear
                  </label>
                  <div
                    class="mr-1"
                  >
                    :
                  </div>
                  <div
                    class="relative"
                  >
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-labelledby="headlessui-listbox-label-1 headlessui-listbox-button-2"
                      class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                      id="headlessui-listbox-button-2"
                      type="button"
                    >
                      <span
                        class="block truncate"
                      >
                        2022
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
              </div>
            </div>
            <div
              class="w-full shadow overflow-auto rounded-t-lg space-y-2 flex flex-col flex-grow"
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
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[18%] text-center py-3"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:yearGoal.table.category
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[18%] text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:yearGoal.table.baseYear
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[18%] text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:yearGoal.table.target
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[18%] text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      2022 Target
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[18%] text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:yearGoal.table.unit
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[10%] text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      common:edit
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
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      用電強度
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2021
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      下降 2 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2,150.4
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      千度 / 十億新臺幣
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      用水強度
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2016
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      下降 9 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      6.1
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      千噸 / 十億新臺幣
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      碳排放量
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2016
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      下降 21 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      241,772
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      公噸
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      約當單台用電
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2021
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      下降 5 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2.0
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      度 / 臺
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      廢棄物密度
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2018
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      下降 2 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      142.3
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      公噸 / 十億新臺幣
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center py-3"
                      role="cell"
                    >
                      可再生能源
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      2022
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      占比 &gt; 60 %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      0.6
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[18%] text-center"
                      role="cell"
                    >
                      %
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          class="row-span-1 col-span-2"
        >
          <div
            class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
          >
            <div
              class="flex justify-between"
            >
              <div
                class="flex space-x-2 items-baseline truncate"
              >
                <span
                  class="block truncate"
                >
                  <span
                    class="block truncate text-xl font-medium"
                  >
                    managementPage:carbonIndex.title
                  </span>
                </span>
                <span
                  class="block truncate"
                >
                  <span
                    class="block truncate text-unit"
                  >
                    managementPage:carbonIndex.unit
                  </span>
                </span>
              </div>
              <div
                class="flex items-center"
              >
                <div
                  class="flex items-center"
                >
                  <label
                    class="block truncate font-medium text-gray-50 mr-1"
                    id="headlessui-listbox-label-3"
                  >
                    component:selectLabel.searchYear
                  </label>
                  <div
                    class="mr-1"
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
                      class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                      id="headlessui-listbox-button-4"
                      type="button"
                    >
                      <span
                        class="block truncate"
                      >
                        2022
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
              </div>
            </div>
            <div
              class="w-full shadow overflow-auto rounded-t-lg space-y-2 flex flex-col flex-grow"
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
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/3 text-center py-3"
                      colspan="1"
                      role="columnheader"
                    >
                      Site
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/3 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:carbonIndex.table.amount
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/3 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      common:edit
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
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WMX
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.5050
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WCZ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.4280
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WOK
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.7921
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WKS
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.7921
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WTZ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.7921
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WIH
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.5090
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WZS
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.8042
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WCQ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.8587
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WCD
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.8587
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WHC
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.5090
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center py-3"
                      role="cell"
                    >
                      WNH
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      0.5090
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/3 text-center"
                      role="cell"
                    >
                      <button
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
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          class="row-span-1 col-span-5"
        >
          <div
            class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
          >
            <div
              class="flex justify-between"
            >
              <div
                class="text-xl font-medium"
              >
                managementPage:tRec.title
              </div>
              <div
                class="flex items-center"
              >
                <div
                  class="flex items-center"
                >
                  <label
                    class="block truncate font-medium text-gray-50 mr-1"
                    id="headlessui-listbox-label-5"
                  >
                    component:selectLabel.searchYear
                  </label>
                  <div
                    class="mr-1"
                  >
                    :
                  </div>
                  <div
                    class="relative"
                  >
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-labelledby="headlessui-listbox-label-5 headlessui-listbox-button-6"
                      class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                      id="headlessui-listbox-button-6"
                      type="button"
                    >
                      <span
                        class="block truncate"
                      >
                        2022
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
              </div>
            </div>
            <div
              class="grid grid-cols-7 gap-4 h-full overflow-auto"
            >
              <div
                class="col-span-5 flex flex-col shadow overflow-auto rounded-t-lg flex flex-col flex-grow"
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
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center"
                        colspan="1"
                        role="columnheader"
                        rowspan="1"
                      >
                        managementPage:tRec.table.buyDate
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center"
                        colspan="1"
                        role="columnheader"
                        rowspan="1"
                      >
                        managementPage:tRec.table.unit
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center py-2"
                        colspan="1"
                        role="columnheader"
                      >
                        managementPage:tRec.table.buyArea
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center"
                        colspan="1"
                        role="columnheader"
                      >
                        managementPage:tRec.table.buyUnit
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center"
                        colspan="1"
                        role="columnheader"
                      >
                        managementPage:tRec.table.price
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-[15%] text-center"
                        colspan="1"
                        role="columnheader"
                      >
                        managementPage:tRec.table.currency
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right pr-4"
                        colspan="1"
                        role="columnheader"
                      >
                        <div
                          class="flex space-x-2 justify-end items-center"
                        >
                          <button
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
                        </div>
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
                        class="px-2 text-gray-50 text-lg w-[15%] text-center"
                        role="cell"
                        rowspan="1"
                      >
                        2021-12-24
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg w-[15%] text-center"
                        role="cell"
                        rowspan="1"
                      >
                        200,517
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg w-[15%] text-center py-2"
                        role="cell"
                      >
                        中國
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg w-[15%] text-center"
                        role="cell"
                      >
                        200,517
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg w-[15%] text-center"
                        role="cell"
                      >
                        620,641
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg w-[15%] text-center"
                        role="cell"
                      >
                        人民幣
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right pr-4"
                        role="cell"
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="col-span-2 flex flex-col shadow overflow-auto rounded-t-lg flex flex-col flex-grow"
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
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-center py-2"
                        colspan="1"
                        role="columnheader"
                      />
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-center"
                        colspan="1"
                        role="columnheader"
                      >
                        Plant
                      </th>
                      <th
                        class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 text-right py-2 pr-4"
                        colspan="1"
                        role="columnheader"
                      >
                        <div
                          class="flex space-x-2 justify-end items-center"
                        >
                          <div>
                            綠證
                          </div>
                          <button
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
                        </div>
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
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WOK
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        26,786,129
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WTZ
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        18,163,901
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WMX
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        23,431,976
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WCD
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        20,795,157
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WCQ
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        7,729,877
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WIH
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        9,550,922
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WCZ
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        3,372,709
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WNH
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        3,600,284
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WHC
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        6,564,824
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WZS-1
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        24,604,554
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WKS-1
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        9,314,820
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WKS-5
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        5,132,656
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WKS-6B
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        4,562,361
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WZS-3
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        9,841,821
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WZS-6
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        16,608,074
                      </td>
                    </tr>
                    <tr
                      class="border-b border-divider"
                      role="row"
                    >
                      <td
                        class="px-2 text-gray-50 text-lg text-center py-2"
                        role="cell"
                      />
                      <td
                        class="px-2 text-gray-50 text-lg text-center"
                        role="cell"
                      >
                        WZS-8
                      </td>
                      <td
                        class="px-2 text-gray-50 text-lg text-right py-2 pr-4"
                        role="cell"
                      >
                        10,456,935
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </DocumentFragment>
    `);
  });
});

describe('Data Status Page', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<DataStatusPage />);
    await waitFor(() => expect(getByText(/WCD/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WCQ/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WCZ/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WHC/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WIH/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WKS-1/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WKS-5/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WKS-6A/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WKS-6B/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WMX/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WNH/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WOK/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WTZ/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WZS-1/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WZS-3/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WZS-6/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/WZS-8/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="row-span-2 col-span-7"
        >
          <div
            class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-4"
          >
            <div
              class="text-xl font-medium space-y-2 h-10"
            >
              <div
                class="flex space-x-2"
              >
                <div>
                  dataStatus.title
                </div>
                <div>
                  (dataStatus.subTitle)
                </div>
              </div>
            </div>
            <div
              class="relative flex justify-center items-center"
            >
              <button
                class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600 absolute space-x-1 left-0"
                type="button"
              >
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
                <div>
                  匯入月報表
                </div>
              </button>
              <div
                class="flex space-x-8"
              >
                <div
                  class="flex items-center"
                >
                  <label
                    class="block truncate font-medium text-gray-50 mr-1"
                    id="headlessui-listbox-label-7"
                  >
                    查詢年度
                  </label>
                  <div
                    class="mr-1"
                  >
                    :
                  </div>
                  <div
                    class="relative"
                  >
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-labelledby="headlessui-listbox-label-7 headlessui-listbox-button-8"
                      class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 min-w-28"
                      id="headlessui-listbox-button-8"
                      type="button"
                    >
                      <span
                        class="block truncate"
                      >
                        2022
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
                    class="block truncate font-medium text-gray-50 mr-1"
                    id="headlessui-listbox-label-9"
                  >
                    查詢月份
                  </label>
                  <div
                    class="mr-1"
                  >
                    :
                  </div>
                  <div
                    class="relative"
                  >
                    <button
                      aria-expanded="false"
                      aria-haspopup="true"
                      aria-labelledby="headlessui-listbox-label-9 headlessui-listbox-button-10"
                      class="bg-transparent relative w-full border border-divider rounded-md shadow-sm pl-3 pr-10 py-1 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 min-h-9 border-primary-800 w-24"
                      id="headlessui-listbox-button-10"
                      type="button"
                    >
                      <span
                        class="block truncate"
                      >
                        1
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
            </div>
            <div
              class="absolute right-10"
            >
              <div
                class="flex justify-end space-x-4"
              >
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-gray-50"
                  />
                  <div
                    class=""
                  >
                    dataStatus.noData
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-primary-500"
                  />
                  <div
                    class=""
                  >
                    dataStatus.updated
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
                    dataStatus.notUpdated
                  </div>
                </div>
                <div
                  class="flex items-center space-x-2"
                >
                  <div
                    class="h-3 w-3 rounded-full bg-yellow-500"
                  />
                  <div
                    class=""
                  >
                    dataStatus.incorrectData
                  </div>
                </div>
              </div>
              <div
                class="flex justify-end"
              >
                dataStatus.csrDesc
              </div>
            </div>
            <div
              class="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg"
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
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    />
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      Plant
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          DPM
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          dataStatus.table.autoSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="3"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          OPM
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          dataStatus.table.autoSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="3"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          FEM
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          dataStatus.table.autoSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          Benefit
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          dataStatus.table.autoSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-1 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          dataStatus.table.waste
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          dataStatus.table.manualSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    />
                  </tr>
                  <tr
                    role="row"
                  >
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.DPMEquProduction
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.OPMRevenue
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.OPMManual
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.OPMShipment
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.FEMElectric
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.FEMWater
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.FEMSolar
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.benefit
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 !py-1"
                      colspan="1"
                      role="columnheader"
                    >
                      dataStatus.table.wasteWeight
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
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WCD(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WCQ(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WCZ(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WHC()
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WIH(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="line-through text-gray-300"
                      >
                        WKS-1(WT)
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WKS-5(WSD)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="line-through text-gray-300"
                      >
                        WKS-6A(WSD)
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WKS-6B(WSD)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WMX(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WNH()
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WOK(WSD)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WTZ(WSD)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WZS-1(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-dangerous-700"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WZS-3(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WZS-6(WT)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
                      role="cell"
                    />
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      WZS-8(WSD)
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-yellow-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-gray-50"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 !py-1"
                      role="cell"
                    >
                      <div
                        class="flex justify-center"
                      >
                        <div
                          class="rounded-full h-3 w-3 text-center bg-primary-500"
                        />
                      </div>
                    </td>
                    <td
                      class="py-3 text-gray-50 text-center text-lg px-2 w-1 !py-1"
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

describe('PIC Page', () => {
  it('handles good response', async () => {
    const { asFragment, getByText } = renderWithProviders(<PicPage users={usersJson} />);
    await waitFor(() => expect(getByText(/Barry Cao 曹俊傑/)).toBeInTheDocument());
    await waitFor(() => expect(getByText(/Fly Zhang 張翔/)).toBeInTheDocument());
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <div
          class="row-span-2 col-span-7"
        >
          <div
            class="flex flex-col bg-primary-900 rounded shadow p-4 h-full space-y-6"
          >
            <div
              class="text-xl font-medium"
            >
              managementPage:pic.title
            </div>
            <div
              class="w-full flex flex-grow flex-col shadow overflow-auto rounded-t-lg"
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
                    >
                      Plant
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="2"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          營收 & 出貨 (WT)
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          managementPage:pic.table.manualSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="2"
                      role="columnheader"
                    >
                      <div
                        class="flex items-center justify-center border-b border-divider py-3 divide-x divide-divider"
                      >
                        <div
                          class="px-2"
                        >
                          managementPage:pic.table.waste
                        </div>
                        <div
                          class="px-2 text-gray-400 text-sm"
                        >
                          managementPage:pic.table.manualSync
                        </div>
                      </div>
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap px-2"
                      colspan="1"
                      role="columnheader"
                      rowspan="2"
                    >
                      common:edit
                    </th>
                  </tr>
                  <tr
                    role="row"
                  >
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/5 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      PIC
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/5 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:pic.table.remark
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/5 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      PIC
                    </th>
                    <th
                      class="text-center text-lg font-medium text-gray-50 tracking-wider whitespace-nowrap py-3 px-2 w-1/5 text-center"
                      colspan="1"
                      role="columnheader"
                    >
                      managementPage:pic.table.remark
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
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WCD
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WCQ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WCZ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WIH
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WKS-1
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WKS-5
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      Barry Cao 曹俊傑
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WKS-6A
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WKS-6B
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      Fly Zhang 張翔
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WMX
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WOK
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      Lijie Liu 劉利杰
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WTZ
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      Jiuling Ai 艾九靈
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      請假中，代理人Wen Zhu
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WZS-1
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WZS-3
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WZS-6
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
                  </tr>
                  <tr
                    class="border-b border-divider"
                    role="row"
                  >
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center py-3"
                      role="cell"
                    >
                      WZS-8
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      Joann zhang 張小梅
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    />
                    <td
                      class="px-2 text-gray-50 text-lg w-1/5 text-center"
                      role="cell"
                    >
                      -
                    </td>
                    <td
                      class="px-2 text-gray-50 text-lg w-[10%] text-center"
                      role="cell"
                    >
                      <button
                        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none cursor-not-allowed"
                        disabled=""
                        type="button"
                      >
                        <div
                          class="opacity-50"
                        >
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
                    </td>
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
