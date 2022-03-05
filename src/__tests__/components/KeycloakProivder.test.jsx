import { render } from '@testing-library/react';

import KeycloakProvider from '../../keycloak/KeycloakProvider';

test('KeycloakProvider', () => {
  const { asFragment } = render(<KeycloakProvider />);
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      <div
        class="flex flex-col space-y-2 items-center justify-center w-screen h-screen"
      >
        <img
          alt="logo"
          class="w-32 h-32 animate-pulse"
          src="/logo-128x128.png"
        />
      </div>
    </DocumentFragment>
  `);
});
