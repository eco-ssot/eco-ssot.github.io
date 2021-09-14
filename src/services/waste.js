import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { axiosBaseQuery } from './helpers';
import { getMaxDate } from '../utils/date';

export function toRow({
  site,
  unrecoverableGeneral,
  unrecoverableGazardous,
  recoverableGeneral,
  recoverableResource,
  total,
  currentYTM,
  intensityCurrentYTM,
  intensityBaseYear,
  intensityGradient,
  recoveryRate,
  plants = [],
} = {}) {
  return {
    site,
    total,
    revenue: currentYTM,
    recycleRate: recoveryRate,
    nonRecyclable: {
      normal: unrecoverableGeneral,
      harmful: unrecoverableGazardous,
    },
    recyclable: {
      normal: recoverableGeneral,
      waste: recoverableResource,
    },
    waste: {
      currYear: intensityCurrentYTM,
      baseYear: intensityBaseYear,
      delta: intensityGradient,
    },
    subRows: plants.map(toRow),
    ...(site === 'Total' && { isFooter: true }),
  };
}

export const wasteApi = createApi({
  reducerPath: 'wasteApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWaste: builder.query({
      query: (query) => ({ query, url: 'waste' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ site }) => site === 'Total');
        const maxDate = getMaxDate(
          ...res.data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return { maxDate, data: [...records, ...total].map(toRow) };
      },
    }),
    getWasteAnalysis: builder.query({
      query: (query) => ({ query, url: 'waste/anaysis' }),
    }),
  }),
});

export const { useGetWasteQuery, useGetWasteAnalysisQuery } = wasteApi;
