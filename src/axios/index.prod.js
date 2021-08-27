import axios from 'axios';

import tokenInterceptor from './tokenInterceptor';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

instance.interceptors.request.use(tokenInterceptor);

export default instance;
