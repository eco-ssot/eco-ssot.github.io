import { render } from '@testing-library/react';

import DatePicker from './DatePicker';

test('DatePicker', () => {
  const { container } = render(<DatePicker />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <div
      class="relative flex h-full bg-gray-50 bg-opacity-10"
    >
      <div
        class="react-datepicker-wrapper"
      >
        <div
          class="react-datepicker__input-container"
        >
          <input
            class=""
            placeholder="yyyy-mm-dd"
            type="text"
            value=""
          />
        </div>
      </div>
    </div>
  `);
});
