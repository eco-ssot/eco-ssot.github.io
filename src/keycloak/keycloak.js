import Keycloak from 'keycloak-js';

const { REACT_APP_KEYCLOAK_REALM, REACT_APP_KEYCLOAK_URL, REACT_APP_KEYCLOAK_CLIENT_ID } = process.env;

export default Keycloak({
  realm: REACT_APP_KEYCLOAK_REALM,
  url: REACT_APP_KEYCLOAK_URL,
  clientId: REACT_APP_KEYCLOAK_CLIENT_ID,
});
