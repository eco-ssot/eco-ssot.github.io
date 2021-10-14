import { render } from '@testing-library/react';

import Arrow from '../../components/arrow/Arrow';

test('Arrow up', () => {
  const { asFragment } = render(<Arrow direction="up" />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});

test('Arrow down', () => {
  const { asFragment } = render(<Arrow direction="down" />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
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
    </DocumentFragment>
  `);
});

test('Arrow null', () => {
  const { container } = render(<Arrow direction={null} />);
  expect(container.firstChild).toBeNull();
});
