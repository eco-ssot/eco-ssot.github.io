import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery } from './helpers';

export function toRow({
  name,
  waterCompareYear,
  waterCurrentYear,
  waterWeight,
  waterGradient,
  revenueCompareYear,
  revenueCurrentYear,
  revenueWeight,
  revenueGradient,
  billiRevenueCompareYear,
  billiRevenueCurrentYear,
  billiRevenueWeight,
  billiRevenueGradient,
  compareBaseYear,
  compareBaseGradient,
  plants = [],
} = {}) {
  return {
    site: name,
    water: {
      currYear: waterCurrentYear,
      lastYear: waterCompareYear,
      weight: waterWeight,
      delta: waterGradient,
    },
    revenue: {
      currYear: revenueCurrentYear,
      lastYear: revenueCompareYear,
      weight: revenueWeight,
      delta: revenueGradient,
    },
    revenueWater: {
      currYear: billiRevenueCurrentYear,
      lastYear: billiRevenueCompareYear,
      weight: billiRevenueWeight,
      delta: billiRevenueGradient,
    },
    comparison: {
      baseYear: compareBaseYear,
      delta: compareBaseGradient,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const waterApi = createApi({
  reducerPath: 'waterApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWater: builder.query({
      query: (query) => ({ query, url: 'water' }),
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
    getWaterAnalysis: builder.query({
      query: (query) => ({ query, url: 'water/anaysis' }),
    }),
  }),
});

export const { useGetWaterQuery, useGetWaterAnalysisQuery } = waterApi;
