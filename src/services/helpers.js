import { saveAs } from 'file-saver';
import qs from 'query-string';

import axios from '../axios';

export const axiosBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ url = '', method = 'GET', data = {}, query = {} } = {}) => {
    try {
      const search = qs.stringify(query);
      const result = await axios({
        method,
        data,
        url: `${baseUrl}${url}${search ? `?${search}` : ''}`,
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const axiosMultipleQueries =
  ({ baseUrl = '/' } = {}) =>
  async (queries) => {
    const promises = queries.map(({ url = '', method = 'GET', data = {}, query = {} } = {}) => {
      const search = qs.stringify(query);
      return axios({
        method,
        data,
        url: `${baseUrl}${url}${search ? `?${search}` : ''}`,
      });
    });

    try {
      const responses = await Promise.all(promises);
      return { data: responses.map((res) => res.data) };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export const axiosFileDownload =
  ({ baseUrl = '/' } = {}) =>
  async ({
    url = '',
    method = 'GET',
    responseType = 'arrayBuffer',
    filename = 'download.xlsx',
    data = {},
    query = {},
    option = {},
  } = {}) => {
    const { data: _data } = await axiosBaseQuery({ baseUrl })({
      url,
      method,
      data,
      query,
      option,
      responseType,
    });

    const blob = new Blob([_data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, `${filename}.xlsx`);
  };
