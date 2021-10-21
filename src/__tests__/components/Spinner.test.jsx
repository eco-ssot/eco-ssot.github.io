import { renderWithProviders } from '../../__mocks__/helpers';
import Spinner from '../../components/spinner/Spinner';

test('Spinner', () => {
  const { asFragment } = renderWithProviders(<Spinner />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});
