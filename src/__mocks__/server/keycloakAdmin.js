import { rest } from 'msw';

import userJson from '../get/users';

const keycloakAdmin = [
  rest.get(
    `${process.env.REACT_APP_KEYCLOAK_URL}/admin/realms/${process.env.REACT_APP_KEYCLOAK_REALM}/users`,
    (req, res, ctx) => {
      return res(ctx.json(userJson));
    }
  ),
];

export { keycloakAdmin };
