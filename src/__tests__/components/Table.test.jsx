import { render } from '@testing-library/react';

import Table from '../../components/table/Table';

test('Table', () => {
  const { asFragment } = render(<Table columns={[]} data={[]} />);
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
