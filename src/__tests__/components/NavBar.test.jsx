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
    </DocumentFragment>
  `);
});
