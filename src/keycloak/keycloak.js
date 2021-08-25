import Keycloak from 'keycloak-js';

const keycloak = Keycloak();

export default Number(process.env.REACT_APP_MOCK) ? {} : keycloak;
