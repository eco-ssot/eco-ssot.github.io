import { renderWithProviders } from '../../__mocks__/helpers';
import NavBar from '../../components/nav-bar/NavBar';

test('NavBar', () => {
  const { asFragment } = renderWithProviders(<NavBar />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});
