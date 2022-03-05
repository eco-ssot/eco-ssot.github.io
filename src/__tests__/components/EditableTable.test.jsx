import { render } from '@testing-library/react';

import EditableTable, {
  AdSearchSelectCell,
  EditableButton,
  EditableIconButton,
  CustomInputCell,
  EditableInput,
  InputCell,
  TextareaCell,
} from '../../components/table/EditableTable';

test('EditableTable', () => {
  const { asFragment } = render(<EditableTable columns={[]} data={[]} />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <table
        role="table"
      >
        <thead
          class="bg-primary-800  sticky top-0 z-1"
        />
        <tbody
          role="rowgroup"
        />
      </table>
    </DocumentFragment>
  `);
});

test('AdSearchSelectCell', () => {
  const { asFragment } = render(<AdSearchSelectCell />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class=" css-ktvv8x-container"
      >
        <span
          class="css-1f43avz-a11yText-A11yText"
          id="react-select-2-live-region"
        />
        <span
          aria-atomic="false"
          aria-live="polite"
          aria-relevant="additions text"
          class="css-1f43avz-a11yText-A11yText"
        />
        <div
          class=" css-1najnp0-control"
        >
          <div
            class=" css-319lph-ValueContainer"
          >
            <div
              class=" css-d490ir-singleValue"
            />
            <div
              class=" css-nr3ry-Input"
              data-value=""
            >
              <input
                aria-autocomplete="list"
                aria-controls="react-select-2-listbox"
                aria-expanded="false"
                aria-haspopup="true"
                aria-owns="react-select-2-listbox"
                autocapitalize="none"
                autocomplete="off"
                autocorrect="off"
                class=""
                id="react-select-2-input"
                role="combobox"
                spellcheck="false"
                style="opacity: 1; width: 100%; grid-area: 1 / 2; min-width: 2px; border: 0px; margin: 0px; outline: 0; padding: 0px;"
                tabindex="0"
                type="text"
                value=""
              />
            </div>
          </div>
          <div
            class=" css-1hb7zxy-IndicatorsContainer"
          >
            <svg
              class="w-5 h-5 mr-2"
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
        </div>
      </div>
    </DocumentFragment>
  `);
});

test('EditableButton', () => {
  const { asFragment } = render(<EditableButton />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded shadow-sm text-gray-50 bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-600"
        type="button"
      />
    </DocumentFragment>
  `);
});

test('EditableIconButton', () => {
  const { asFragment } = render(<EditableIconButton />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <button
        class="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-gray-50 focus:outline-none"
        type="button"
      >
        <div />
      </button>
    </DocumentFragment>
  `);
});

test('CustomInputCell', () => {
  const { asFragment } = render(<CustomInputCell />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex h-full"
      >
        <div
          class="mx-auto h-full relative"
        >
          <input
            class="bg-gray-50 bg-opacity-10 shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-10 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50"
            placeholder=""
            type="text"
            value=""
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          >
            %
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});

test('EditableInput', () => {
  const { asFragment } = render(<EditableInput />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex h-full"
      >
        <div
          class="mx-auto h-full relative"
        >
          <input
            class="bg-gray-50 bg-opacity-10 shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-10 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50"
            placeholder=""
            type="text"
            value=""
          />
        </div>
      </div>
    </DocumentFragment>
  `);
});

test('InputCell', () => {
  const { asFragment } = render(<InputCell />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex h-full"
      >
        <div
          class="mx-auto h-full relative"
        >
          <input
            class="bg-gray-50 bg-opacity-10 shadow-sm hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 block w-full border-gray-50 border-opacity-10 rounded py-1 px-2 placeholder-gray-50 placeholder-opacity-50"
            placeholder=""
            type="text"
            value=""
          />
        </div>
      </div>
    </DocumentFragment>
  `);
});

test('TextareaCell', () => {
  const { asFragment } = render(<TextareaCell />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <textarea
        class="bg-gray-50 bg-opacity-10 shadow-sm block w-full hover:border-primary-600 focus:ring-primary-600 focus:border-primary-600 border border-divider rounded-md bg-transparent border-opacity-50"
        rows="1"
      />
    </DocumentFragment>
  `);
});
