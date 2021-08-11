import axios from 'axios';

import { mockInterceptor } from './interceptors';

const instance = axios.create({ baseURL: '' });
instance.interceptors.request.use(mockInterceptor);

export default instance;
