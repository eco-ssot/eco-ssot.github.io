import { sortBy } from 'lodash';
import qs from 'query-string';

import axios from '../axios';

export const EXCLUDED_CACHE_KEYS = ['PREFETCH'];

export const axiosBaseQuery =
  ({ baseUrl = '/' } = {}) =>
  async ({ headers, url = '', method = 'GET', data = {}, query = {} } = {}) => {
    const { permission, ...q } = query;
    const search = qs.stringify(q);
    try {
      const result = await axios({
        method,
        data,
        url: qs.exclude(`${baseUrl}${url}${search ? `?${search}` : ''}`, EXCLUDED_CACHE_KEYS),
        ...(headers && { headers }),
      });

      return { data: result.data, meta: { permission, query: q } };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data, meta: { permission, query: q } },
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

export function getPlantData(data, plantPermission, key = 'site') {
  if (!plantPermission) {
    return data;
  }

  return data
    ?.filter((d) => [...plantPermission, 'Total'].find((plant) => plant.startsWith(String(d[key]))))
    ?.map((_d) => ({ ..._d, plants: _d.plants?.filter((r) => plantPermission.includes(r[key])) }));
}
