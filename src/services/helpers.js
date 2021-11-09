import { sortBy } from 'lodash';
import qs from 'query-string';

import axios from '../axios';
import APP_CONFIG from '../constants/app-config';

export const axiosBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ headers, url = '', method = 'GET', data = {}, query = {} } = {}) => {
    try {
      const search = qs.stringify(query);
      const result = await axios({
        method,
        data,
        url: `${baseUrl}${url}${search ? `?${search}` : ''}`,
        ...(headers && { headers }),
      });

      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export function sortExplanationsById(res) {
  return {
    data: sortBy(
      res?.data.map(({ imrprovements = [], ...rest }) => ({
        ...rest,
        imrprovements: sortBy(imrprovements, ({ id }) => id),
      })),
      ({ id }) => id
    ),
  };
}

export function siteNoData(row = {}, subRows = []) {
  const noValue = (obj) => Object.values(obj).some((val) => val === APP_CONFIG.NO_DATA);
  return noValue(row) || subRows.some(noValue);
}
