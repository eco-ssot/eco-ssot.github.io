import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { axiosBaseQuery } from '../axios/helpers';
import { getMaxDate } from '../utils/date';
import APP_CONFIG from '../constants/app-config';

export function toRow({
  site,
  ASPCompareYear,
  ASPCurrentYear,
  ASPGradient,
  ASPWeight,
  electricCompareYear,
  electricCurrentYear,
  electricGradient,
  electricWeight,
  revenueCompareYear,
  revenueCurrentYear,
  revenueGradient,
  revenueWeight,
  waterUseCompareYear,
  waterUseCurrentYear,
  waterUseGradient,
  waterUseWeight,
  currYear = APP_CONFIG.CURRENT_YEAR,
  lastYear = APP_CONFIG.LAST_YEAR,
  plants = [],
} = {}) {
  return {
    site,
    electricity: {
      [currYear]: electricCurrentYear,
      [lastYear]: electricCompareYear,
      weight: electricWeight,
      delta: electricGradient,
    },
    water: {
      [currYear]: waterUseCurrentYear,
      [lastYear]: waterUseCompareYear,
      weight: waterUseWeight,
      delta: waterUseGradient,
    },
    revenue: {
      [currYear]: revenueCurrentYear,
      [lastYear]: revenueCompareYear,
      weight: revenueWeight,
      delta: revenueGradient,
    },
    asp: {
      [currYear]: ASPCurrentYear,
      [lastYear]: ASPCompareYear,
      weight: ASPWeight,
      delta: ASPGradient,
    },
    subRows: plants.map(toRow),
    ...(site === 'Total' && { isFooter: true }),
  };
}

export const overviewApi = createApi({
  reducerPath: 'overviewApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: (query) => ({ query, url: 'overall' }),
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
  }),
});

export const { useGetOverviewQuery } = overviewApi;
