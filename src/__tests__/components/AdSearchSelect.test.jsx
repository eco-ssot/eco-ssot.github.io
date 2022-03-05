import { render } from '@testing-library/react';

import AdSearchSelect from '../../components/select/AdSearchSelect';

test('AdSearchSelect', () => {
  const { asFragment } = render(<AdSearchSelect />);
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
              class=" css-1cc7sk8-placeholder"
              id="react-select-2-placeholder"
            >
              Select...
            </div>
            <div
              class=" css-nr3ry-Input"
              data-value=""
            >
              <input
                aria-autocomplete="list"
                aria-controls="react-select-2-listbox"
                aria-describedby="react-select-2-placeholder"
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
