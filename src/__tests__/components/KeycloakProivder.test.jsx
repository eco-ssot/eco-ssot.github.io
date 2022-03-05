import { render } from '@testing-library/react';

import KeycloakProvider from '../../keycloak/KeycloakProvider';

test('KeycloakProvider', () => {
  const { asFragment } = render(<KeycloakProvider />);
  expect(asFragment()).toMatchInlineSnapshot();
});
