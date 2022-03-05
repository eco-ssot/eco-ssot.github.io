import { waitFor } from '@testing-library/dom';

import { renderWithProviders } from '../../__mocks__/helpers';
import App from '../../app/App';

test('App', async () => {
  const { asFragment, queryByText } = renderWithProviders(<App />);
  await waitFor(() => expect(queryByText('28,356')).toBeInTheDocument());
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
          <span
            class="block truncate"
          >
            <span
              class="block truncate font-medium text-xl"
              currentitem="false"
              data-for="4eEFZghD-bpUTi6z8evb1"
              data-tip="true"
            >
              title
            </span>
            <div
              class="__react_component_tooltip tb7f94363-1eae-4ac3-bd8c-1026f36382a4 place-top type-dark"
              data-id="tooltip"
              id="4eEFZghD-bpUTi6z8evb1"
            >
              <style
                aria-hidden="true"
              >
                
      	.tb7f94363-1eae-4ac3-bd8c-1026f36382a4 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-top {
            margin-top: -10px;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-top::before {
            border-top: 8px solid transparent;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-bottom {
            margin-top: 10px;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-left {
            margin-left: -10px;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-left::before {
            border-left: 8px solid transparent;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-right {
            margin-left: 10px;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-right::before {
            border-right: 8px solid transparent;
        }
        .tb7f94363-1eae-4ac3-bd8c-1026f36382a4.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
              </style>
              <span>
                title
              </span>
            </div>
          </span>
          <span
            class="block truncate"
          >
            <span
              class="block truncate text-unit text-sm"
              currentitem="false"
              data-for="1J0g2TMQnObCjwEbgIRqL"
              data-tip="true"
            >
              Ver3.0.1
            </span>
            <div
              class="__react_component_tooltip tc4915393-3da4-4a75-8ffa-465b66ab1e64 place-top type-dark"
              data-id="tooltip"
              id="1J0g2TMQnObCjwEbgIRqL"
            >
              <style
                aria-hidden="true"
              >
                
      	.tc4915393-3da4-4a75-8ffa-465b66ab1e64 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-top {
            margin-top: -10px;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-top::before {
            border-top: 8px solid transparent;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-bottom {
            margin-top: 10px;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-left {
            margin-left: -10px;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-left::before {
            border-left: 8px solid transparent;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-right {
            margin-left: 10px;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-right::before {
            border-right: 8px solid transparent;
        }
        .tc4915393-3da4-4a75-8ffa-465b66ab1e64.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
              </style>
              <span>
                Ver3.0.1
              </span>
            </div>
          </span>
        </a>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="mt-1 relative min-w-28 w-28"
        >
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800"
            id="headlessui-listbox-button-1"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
                currentitem="false"
                data-for="qp8dUCN635s5fUvPAa9Ay"
                data-tip="true"
              >
                ALL
              </span>
              <div
                class="__react_component_tooltip tab56ef59-30c8-4e67-b888-ee4873aa1682 place-top type-dark"
                data-id="tooltip"
                id="qp8dUCN635s5fUvPAa9Ay"
              >
                <style
                  aria-hidden="true"
                >
                  
      	.tab56ef59-30c8-4e67-b888-ee4873aa1682 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.tab56ef59-30c8-4e67-b888-ee4873aa1682.place-top {
            margin-top: -10px;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-top::before {
            border-top: 8px solid transparent;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-bottom {
            margin-top: 10px;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-left {
            margin-left: -10px;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-left::before {
            border-left: 8px solid transparent;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-right {
            margin-left: 10px;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-right::before {
            border-right: 8px solid transparent;
        }
        .tab56ef59-30c8-4e67-b888-ee4873aa1682.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
                </style>
                <span>
                  ALL
                </span>
              </div>
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
          class="mt-1 relative min-w-36"
        >
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800 w-42"
            id="headlessui-listbox-button-2"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
                currentitem="false"
                data-for="e9VKAG7vYd6MbWc0hQRz2"
                data-tip="true"
              >
                Sites / Plants
              </span>
              <div
                class="__react_component_tooltip t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4 place-top type-dark"
                data-id="tooltip"
                id="e9VKAG7vYd6MbWc0hQRz2"
              >
                <style
                  aria-hidden="true"
                >
                  
      	.t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-top {
            margin-top: -10px;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-top::before {
            border-top: 8px solid transparent;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-bottom {
            margin-top: 10px;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-left {
            margin-left: -10px;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-left::before {
            border-left: 8px solid transparent;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-right {
            margin-left: 10px;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-right::before {
            border-right: 8px solid transparent;
        }
        .t1e766bd5-ac2d-4c28-8fcb-740c9e5a63c4.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
                </style>
                <span>
                  Sites / Plants
                </span>
              </div>
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
            class="border-primary-600 text-gray-50 inline-flex items-center px-1 pt-1 border-b-2"
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
          currentitem="false"
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
          class="__react_component_tooltip t48d0b53b-2cb2-416c-9fe0-0cbf34ded938 place-left type-dark"
          data-id="tooltip"
          id="guidebook"
        >
          <style
            aria-hidden="true"
          >
            
      	.t48d0b53b-2cb2-416c-9fe0-0cbf34ded938 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-top {
            margin-top: -10px;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-top::before {
            border-top: 8px solid transparent;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-bottom {
            margin-top: 10px;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-left {
            margin-left: -10px;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-left::before {
            border-left: 8px solid transparent;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-right {
            margin-left: 10px;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-right::before {
            border-right: 8px solid transparent;
        }
        .t48d0b53b-2cb2-416c-9fe0-0cbf34ded938.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
          </style>
          <span>
            系統說明手冊
          </span>
        </div>
        <div
          class="h-4 mx-4 border-0 border-r border-divider h-1/2"
        />
        <div
          class="mt-1 relative min-w-28 w-30"
        >
          <button
            aria-expanded="false"
            aria-haspopup="true"
            class="bg-transparent relative w-full border rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 hover:border-primary-600 border-primary-800"
            id="headlessui-listbox-button-3"
            type="button"
          >
            <span
              class="block truncate"
            >
              <span
                class="block truncate text-lg"
                currentitem="false"
                data-for="4zvbNopffn44GEhcbSzfg"
                data-tip="true"
              >
                中文
              </span>
              <div
                class="__react_component_tooltip tb89b4b13-1679-44d6-9307-6bef0e35aa12 place-top type-dark"
                data-id="tooltip"
                id="4zvbNopffn44GEhcbSzfg"
              >
                <style
                  aria-hidden="true"
                >
                  
      	.tb89b4b13-1679-44d6-9307-6bef0e35aa12 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-top {
            margin-top: -10px;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-top::before {
            border-top: 8px solid transparent;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-bottom {
            margin-top: 10px;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-left {
            margin-left: -10px;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-left::before {
            border-left: 8px solid transparent;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-right {
            margin-left: 10px;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-right::before {
            border-right: 8px solid transparent;
        }
        .tb89b4b13-1679-44d6-9307-6bef0e35aa12.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
                </style>
                <span>
                  中文
                </span>
              </div>
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
        <span
          class="block truncate"
        >
          <span
            class="block truncate"
            currentitem="false"
            data-for="PGk0ZF6yb2iDuvGudutqt"
            data-tip="true"
          >
            dummy
          </span>
          <div
            class="__react_component_tooltip t41671b7d-b47f-453e-8609-b364ff438e86 place-top type-dark"
            data-id="tooltip"
            id="PGk0ZF6yb2iDuvGudutqt"
          >
            <style
              aria-hidden="true"
            >
              
      	.t41671b7d-b47f-453e-8609-b364ff438e86 {
    	    color: #fff;
    	    background: #222;
    	    border: 1px solid transparent;
      	}

      	.t41671b7d-b47f-453e-8609-b364ff438e86.place-top {
            margin-top: -10px;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-top::before {
            border-top: 8px solid transparent;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-top::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            bottom: -6px;
            left: 50%;
            margin-left: -8px;
            border-top-color: #222;
            border-top-style: solid;
            border-top-width: 6px;
        }

        .t41671b7d-b47f-453e-8609-b364ff438e86.place-bottom {
            margin-top: 10px;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-bottom::before {
            border-bottom: 8px solid transparent;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-bottom::after {
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            top: -6px;
            left: 50%;
            margin-left: -8px;
            border-bottom-color: #222;
            border-bottom-style: solid;
            border-bottom-width: 6px;
        }

        .t41671b7d-b47f-453e-8609-b364ff438e86.place-left {
            margin-left: -10px;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-left::before {
            border-left: 8px solid transparent;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-left::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            right: -6px;
            top: 50%;
            margin-top: -4px;
            border-left-color: #222;
            border-left-style: solid;
            border-left-width: 6px;
        }

        .t41671b7d-b47f-453e-8609-b364ff438e86.place-right {
            margin-left: 10px;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-right::before {
            border-right: 8px solid transparent;
        }
        .t41671b7d-b47f-453e-8609-b364ff438e86.place-right::after {
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
            left: -6px;
            top: 50%;
            margin-top: -4px;
            border-right-color: #222;
            border-right-style: solid;
            border-right-width: 6px;
        }
      
            </style>
            <span>
              dummy
            </span>
          </div>
        </span>
      </div>
      <div
        class="pt-16"
      >
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
                        id="headlessui-listbox-button-4"
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
                        id="headlessui-listbox-button-5"
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
                  id="headlessui-listbox-label-6"
                >
                  compareYear : 
                </label>
                <div
                  class="relative"
                >
                  <button
                    aria-expanded="false"
                    aria-haspopup="true"
                    aria-labelledby="headlessui-listbox-label-6 headlessui-listbox-button-7"
                    class="flex space-x-2 pl-2 py-1 items-center bg-transparent relative w-full text-left cursor-pointer"
                    id="headlessui-listbox-button-7"
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
      </div>
       
    </DocumentFragment>
  `);
});
