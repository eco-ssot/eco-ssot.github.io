import { render } from '@testing-library/react';

import AdSearchSelect from '../../components/select/AdSearchSelect';

test('AdSearchSelect', () => {
  const { asFragment } = render(<AdSearchSelect />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class=" css-c47zjw-container"
      >
        <span
          aria-atomic="false"
          aria-live="polite"
          aria-relevant="additions text"
          class="css-1f43avz-a11yText-A11yText"
        />
        <div
          class=" css-1xh1nu3-control"
        >
          <div
            class=" css-g1d714-ValueContainer"
          >
            <div
              class=" css-k4cph3-placeholder"
            >
              Select...
            </div>
            <div
              class="css-1bpwcu6-Input"
            >
              <div
                class=""
                style="display: inline-block;"
              >
                <input
                  aria-autocomplete="list"
                  autocapitalize="none"
                  autocomplete="off"
                  autocorrect="off"
                  id="react-select-2-input"
                  spellcheck="false"
                  style="box-sizing: content-box; width: 2px; border: 0px; opacity: 1; outline: 0; padding: 0px;"
                  tabindex="0"
                  type="text"
                  value=""
                />
                <div
                  style="position: absolute; top: 0px; left: 0px; visibility: hidden; height: 0px; overflow: scroll; white-space: pre;"
                />
              </div>
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
