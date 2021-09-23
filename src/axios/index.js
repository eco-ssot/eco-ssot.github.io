import axios from 'axios';

import loggerInterceptor from './loggerInterceptor';
import mockInterceptor from './mockInterceptor';
import tokenInterceptor from './tokenInterceptor';

const {
  REACT_APP_MOCK_API,
  REACT_APP_API_BASE_URL,
  REACT_APP_MOCK_KEYCLOAK,
  REACT_APP_KEYCLOAK_REALM,
  REACT_APP_KEYCLOAK_URL,
} = process.env;

const instance = axios.create({
  baseURL: Number(REACT_APP_MOCK_API) ? '' : REACT_APP_API_BASE_URL || '',
});

const keycloakInstance = axios.create({
  baseURL: Number(REACT_APP_MOCK_KEYCLOAK) ? '' : `${REACT_APP_KEYCLOAK_URL}/admin/realms/${REACT_APP_KEYCLOAK_REALM}`,
});

if (Number(REACT_APP_MOCK_API)) {
  instance.interceptors.request.use(mockInterceptor);
}

if (Number(REACT_APP_MOCK_KEYCLOAK)) {
  keycloakInstance.interceptors.request.use(mockInterceptor);
}

instance.interceptors.request.use(tokenInterceptor);
keycloakInstance.interceptors.request.use(tokenInterceptor);

instance.interceptors.response.use(loggerInterceptor);
keycloakInstance.interceptors.response.use(loggerInterceptor);

export { keycloakInstance };
export default instance;
