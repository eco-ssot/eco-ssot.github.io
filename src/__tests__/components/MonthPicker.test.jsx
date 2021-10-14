import { render } from '@testing-library/react';

import MonthPicker from '../../components/input/MonthPicker';

test('MonthPicker', () => {
  const { asFragment } = render(<MonthPicker />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="relative flex"
      >
        <div
          class="react-datepicker-wrapper"
        >
          <div
            class="react-datepicker__input-container"
          >
            <input
              class=""
              type="text"
              value="10/2021"
            />
          </div>
        </div>
      </div>
    </DocumentFragment>
  `);
});
