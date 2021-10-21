import { render } from '@testing-library/react';

import Modal from '../../components/modal/Modal';

test('Modal', () => {
  const { asFragment } = render(<Modal />);
  expect(asFragment()).toMatchInlineSnapshot(`<DocumentFragment />`);
});
