import axios from 'axios';

import { mockInterceptor } from './interceptors';

const instance = axios.create({ baseURL: process.env.REACT_APP_BASE_URL || '' });
instance.interceptors.request.use(mockInterceptor);

export default instance;
