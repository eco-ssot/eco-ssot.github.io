import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery } from './helpers';

export function toRow({
  name,
  co2Coefficient,
  co2CurrentYear,
  co2Electric,
  co2Gradient,
  co2baseYear,
  scope1,
  scope2,
  solarElectric,
  tRec,
  totalElectric,
  target,
  plants = [],
} = {}) {
  return {
    target,
    site: name,
    carbonIndex: co2Coefficient,
    electricity: {
      tRec,
      total: totalElectric,
      sun: solarElectric,
      carbon: co2Electric,
    },
    carbon: {
      scope1,
      scope2,
      currYear: co2CurrentYear,
      baseYear: co2baseYear,
      delta: co2Gradient,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const carbonApi = createApi({
  reducerPath: 'carbonApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCarbon: builder.query({
      query: (query) => ({ query, url: 'carbon' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...res.data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return { maxDate, data: [...records, ...total].map(toRow) };
      },
    }),
    getCarbonHistory: builder.query({
      query: (query) => ({ query, url: 'carbon/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
  }),
});

export const { useGetCarbonQuery, useGetCarbonHistoryQuery } = carbonApi;
