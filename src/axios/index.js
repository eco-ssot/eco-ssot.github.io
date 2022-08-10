import axios from 'axios';

import tokenInterceptor from './tokenInterceptor';
import wzs8Interceptor from './wzs8Interceptor';

const { REACT_APP_MOCK_API, REACT_APP_API_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: Number(REACT_APP_MOCK_API) ? 'api' : REACT_APP_API_BASE_URL || '',
});

instance.interceptors.request.use(tokenInterceptor);
instance.interceptors.request.use(wzs8Interceptor);

export default instance;
