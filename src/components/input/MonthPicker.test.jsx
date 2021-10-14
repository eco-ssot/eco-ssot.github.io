import { render } from '@testing-library/react';

import MonthPicker from './MonthPicker';

test('MonthPicker', () => {
  const { container } = render(<MonthPicker />);
  expect(container.firstChild).toMatchInlineSnapshot(`
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
  `);
});
