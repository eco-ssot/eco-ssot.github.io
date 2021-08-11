import qs from 'query-string';

import axios from '../axios';

export const axiosBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ url = '', method = 'get', data = {}, q = {} } = {}) => {
    try {
      const search = qs.stringify(q);
      const result = await axios({
        url: `${baseUrl}${url}${search ? `?${search}` : ''}`,
        method,
        data,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };
