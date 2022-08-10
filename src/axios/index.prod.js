import axios from 'axios';

import tokenInterceptor from './tokenInterceptor';
import wzs8Interceptor from './wzs8Interceptor';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(tokenInterceptor);
instance.interceptors.request.use(wzs8Interceptor);

export default instance;
