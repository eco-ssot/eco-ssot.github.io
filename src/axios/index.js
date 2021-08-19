import axios from 'axios';

import { loggerInterceptor, mockInterceptor } from './interceptors';

const instance = axios.create({
  baseURL: Number(process.env.REACT_APP_MOCK) ? '' : process.env.REACT_APP_BASE_URL || '',
});

instance.interceptors.request.use(mockInterceptor);

instance.interceptors.response.use(loggerInterceptor);

export default instance;
