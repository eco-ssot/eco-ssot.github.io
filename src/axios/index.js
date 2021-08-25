import axios from 'axios';

import mockInterceptor from './mockInterceptor';
import tokenInterceptor from './tokenInterceptor';
import loggerInterceptor from './loggerInterceptor';

const instance = axios.create({
  baseURL: Number(process.env.REACT_APP_MOCK) ? '' : process.env.REACT_APP_BASE_URL || '',
});

instance.interceptors.request.use(mockInterceptor);
instance.interceptors.request.use(tokenInterceptor);

instance.interceptors.response.use(loggerInterceptor);

export default instance;
