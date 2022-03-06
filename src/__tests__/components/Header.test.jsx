import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders, sleep } from '../../__mocks__/helpers';
import Header from '../../components/header/Header';

test('Header', async () => {
  const { asFragment, getByText } = renderWithProviders(<Header />);
  await sleep(1000);

  const boBtn = getByText('ALL');
  fireEvent.click(boBtn);
  expect(screen.getByText('WT')).toBeInTheDocument();
  expect(screen.getByText('WSD')).toBeInTheDocument();

  const siteBtn = getByText('Sites / Plants');
  fireEvent.click(siteBtn);
  expect(screen.getByText('WCD')).toBeInTheDocument();
  expect(screen.getByText('WCQ')).toBeInTheDocument();

  const lngBtn = getByText('中文');
  fireEvent.click(lngBtn);
  expect(screen.getByText('English')).toBeInTheDocument();

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex px-4 bg-primary-800 shadow-lg items-center z-10"
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
          <span
            class="block truncate"
          >
            <span
              class="block truncate font-medium text-xl"
            >
              title
            </span>
          </span>
          <span
            class="block truncate"
          >
            <span
              class="block truncate text-unit text-sm"
            >
              Ver3.0.1
            </span>
          </span>
        </a>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="mt-1 relative min-w-28 w-28"
        >
          <button
            aria-controls="headlessui-listbox-options-5"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="select-business"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-600"
            id="headlessui-listbox-button-1"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
              >
                ALL
              </span>
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
          <ul
            aria-activedescendant="headlessui-listbox-option-6"
            aria-labelledby="headlessui-listbox-button-1"
            aria-orientation="vertical"
            class="absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-900 ring-opacity-5 overflow-auto border border-divider focus:outline-none"
            id="headlessui-listbox-options-5"
            role="listbox"
            tabindex="0"
          >
            <li
              aria-label="option-ALL"
              aria-selected="true"
              class="text-gray-50 bg-primary-600 cursor-default select-none relative py-2 pl-3 pr-9"
              id="headlessui-listbox-option-6"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate font-semibold"
                >
                  ALL
                </span>
              </span>
              <span
                class="text-gray-50 absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
            <li
              aria-label="option-WT"
              class="text-gray-50 cursor-default select-none relative py-2 pl-3 pr-9"
              id="headlessui-listbox-option-7"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate font-normal"
                >
                  WT
                </span>
              </span>
            </li>
            <li
              aria-label="option-WSD"
              class="text-gray-50 cursor-default select-none relative py-2 pl-3 pr-9"
              id="headlessui-listbox-option-8"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate font-normal"
                >
                  WSD
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="mt-1 relative min-w-36"
        >
          <button
            aria-controls="headlessui-listbox-options-10"
            aria-expanded="true"
            aria-haspopup="true"
            aria-label="select-site-plant"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-600 w-42"
            id="headlessui-listbox-button-2"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
              >
                Sites / Plants
              </span>
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
          <ul
            aria-activedescendant="headlessui-listbox-option-11"
            aria-labelledby="headlessui-listbox-button-2"
            aria-orientation="vertical"
            class="absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-900 ring-opacity-5 overflow-auto border border-divider focus:outline-none"
            id="headlessui-listbox-options-10"
            role="listbox"
            tabindex="0"
          >
            <li
              aria-label="option-ALL"
              aria-selected="true"
              class="text-gray-50 bg-primary-600 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-11"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-semibold"
                >
                  ALL
                </span>
              </span>
              <span
                class="text-gray-50 absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
            <li
              aria-label="option-WCD"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-12"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WCD
                </span>
              </span>
            </li>
            <li
              aria-label="option-WCQ"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-13"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WCQ
                </span>
              </span>
            </li>
            <li
              aria-label="option-WCZ"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-14"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WCZ
                </span>
              </span>
            </li>
            <li
              aria-label="option-WHC"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-15"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WHC
                </span>
              </span>
            </li>
            <li
              aria-label="option-WIH"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-16"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WIH
                </span>
              </span>
            </li>
            <li
              aria-label="option-WKS"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-17"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WKS
                </span>
              </span>
            </li>
            <li
              aria-label="option-WKS-1"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-18"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WKS-1
                </span>
              </span>
            </li>
            <li
              aria-label="option-WKS-5"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-19"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WKS-5
                </span>
              </span>
            </li>
            <li
              aria-label="option-WKS-6A"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-20"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WKS-6A
                </span>
              </span>
            </li>
            <li
              aria-label="option-WKS-6B"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-21"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WKS-6B
                </span>
              </span>
            </li>
            <li
              aria-label="option-WMX"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-22"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WMX
                </span>
              </span>
            </li>
            <li
              aria-label="option-WNH"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-23"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WNH
                </span>
              </span>
            </li>
            <li
              aria-label="option-WOK"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-24"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WOK
                </span>
              </span>
            </li>
            <li
              aria-label="option-WTZ"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-25"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WTZ
                </span>
              </span>
            </li>
            <li
              aria-label="option-WZS"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-26"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal"
                >
                  WZS
                </span>
              </span>
            </li>
            <li
              aria-label="option-WZS-1"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-27"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WZS-1
                </span>
              </span>
            </li>
            <li
              aria-label="option-WZS-3"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-28"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WZS-3
                </span>
              </span>
            </li>
            <li
              aria-label="option-WZS-6"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-29"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WZS-6
                </span>
              </span>
            </li>
            <li
              aria-label="option-WZS-8"
              class="text-gray-50 cursor-default select-none relative pl-3 pr-9"
              id="headlessui-listbox-option-30"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate py-2 font-normal border-l-2 border-primary-700 pl-2"
                >
                  WZS-8
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="flex flex-grow space-x-4"
        >
          <div
            aria-label="nav-home"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/home"
            >
              <span
                class="block truncate"
              >
                home
              </span>
            </a>
          </div>
          <div
            aria-label="nav-overview"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/overview"
            >
              <span
                class="block truncate"
              >
                overview
              </span>
            </a>
          </div>
          <div
            aria-label="nav-carbon"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/carbon"
            >
              <span
                class="block truncate"
              >
                carbon
              </span>
            </a>
          </div>
          <div
            aria-label="nav-renewableEnergy"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/renewable-energy"
            >
              <span
                class="block truncate"
              >
                renewableEnergy
              </span>
            </a>
          </div>
          <div
            aria-label="nav-electricity"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/electricity"
            >
              <span
                class="block truncate"
              >
                electricity
              </span>
            </a>
          </div>
          <div
            aria-label="nav-electricityBaseline"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/analysis/electricity"
            >
              <span
                class="block truncate"
              >
                electricityBaseline
              </span>
            </a>
          </div>
          <div
            aria-label="nav-water"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/water"
            >
              <span
                class="block truncate"
              >
                water
              </span>
            </a>
          </div>
          <div
            aria-label="nav-unitElectricity"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/unit-electricity"
            >
              <span
                class="block truncate"
              >
                unitElectricity
              </span>
            </a>
          </div>
          <div
            aria-label="nav-waste"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/waste"
            >
              <span
                class="block truncate"
              >
                waste
              </span>
            </a>
          </div>
          <div
            aria-label="nav-management"
            class="border-b-2 border-primary-800 text-gray-200 hover:text-gray-50 inline-flex items-center px-1 pt-1"
          >
            <a
              class="text-current text-lg font-medium"
              href="/management"
            >
              <span
                class="block truncate"
              >
                management
              </span>
            </a>
          </div>
        </div>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <a
          data-for="guidebook"
          data-tip="true"
          href="/ESG績效管理平台使用手冊.pdf"
          target="_blank"
        >
          <svg
            class="w-5 h-5 fill-gray-50"
          >
            file-pdf-solid.svg
          </svg>
        </a>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="mt-1 relative min-w-28 w-30"
        >
          <button
            aria-controls="headlessui-listbox-options-32"
            aria-expanded="true"
            aria-haspopup="true"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-600"
            id="headlessui-listbox-button-3"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
              >
                中文
              </span>
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
          <ul
            aria-activedescendant="headlessui-listbox-option-33"
            aria-labelledby="headlessui-listbox-button-3"
            aria-orientation="vertical"
            class="absolute z-10 mt-1 w-full bg-primary-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-gray-900 ring-opacity-5 overflow-auto border border-divider focus:outline-none"
            id="headlessui-listbox-options-32"
            role="listbox"
            tabindex="0"
          >
            <li
              aria-label="option-zh"
              aria-selected="true"
              class="text-gray-50 bg-primary-600 cursor-default select-none relative py-2 pl-3 pr-9"
              id="headlessui-listbox-option-33"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate font-semibold"
                >
                  中文
                </span>
              </span>
              <span
                class="text-gray-50 absolute inset-y-0 right-0 flex items-center pr-4"
              >
                <svg
                  aria-hidden="true"
                  class="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    fill-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
            <li
              aria-label="option-en"
              class="text-gray-50 cursor-default select-none relative py-2 pl-3 pr-9"
              id="headlessui-listbox-option-34"
              role="option"
              tabindex="-1"
            >
              <span
                class="block truncate"
              >
                <span
                  class="block truncate font-normal"
                >
                  English
                </span>
              </span>
            </li>
          </ul>
        </div>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <span
          class="block truncate"
        >
          <span
            class="block truncate"
          >
            dummy
          </span>
        </span>
      </div>
    </DocumentFragment>
  `);
});
