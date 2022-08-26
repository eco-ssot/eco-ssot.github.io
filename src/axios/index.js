import axios from 'axios';

import tokenInterceptor from './tokenInterceptor';
import wzs8Interceptor from './wzs8Interceptor';

const instance = axios.create({
  baseURL: Number(import.meta.env.VITE_MOCK_API) ? 'api' : import.meta.env.VITE_API_BASE_URL || '',
});

instance.interceptors.request.use(tokenInterceptor);
instance.interceptors.request.use(wzs8Interceptor);

export default instance;
