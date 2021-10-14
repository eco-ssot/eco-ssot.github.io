import { render } from '@testing-library/react';

import Arrow from './Arrow';

test('Arrow up', () => {
  const { container } = render(<Arrow direction="up" />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <svg
      class="transform rotate-45"
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
  `);
});

test('Arrow down', () => {
  const { container } = render(<Arrow direction="down" />);
  expect(container.firstChild).toMatchInlineSnapshot(`
    <svg
      class="transform -rotate-45"
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
  `);
});

test('Arrow null', () => {
  const { container } = render(<Arrow direction={null} />);
  expect(container.firstChild).toBeNull();
});
