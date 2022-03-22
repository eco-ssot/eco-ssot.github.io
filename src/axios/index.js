import axios from 'axios';

import tokenInterceptor from './tokenInterceptor';
import wzs8Interceptor from './wzs8Interceptor';

const {
  REACT_APP_MOCK_API,
  REACT_APP_API_BASE_URL,
  REACT_APP_MOCK_KEYCLOAK,
  REACT_APP_KEYCLOAK_REALM,
  REACT_APP_KEYCLOAK_URL,
} = process.env;

const instance = axios.create({
  baseURL: Number(REACT_APP_MOCK_API) ? 'api' : REACT_APP_API_BASE_URL || '',
});

const keycloakInstance = axios.create({
  baseURL: Number(REACT_APP_MOCK_KEYCLOAK)
    ? 'api'
    : `${REACT_APP_KEYCLOAK_URL}/admin/realms/${REACT_APP_KEYCLOAK_REALM}`,
});

instance.interceptors.request.use(tokenInterceptor);
instance.interceptors.request.use(wzs8Interceptor);
keycloakInstance.interceptors.request.use(tokenInterceptor);

export { keycloakInstance };
export default instance;
