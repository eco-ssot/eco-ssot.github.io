import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery, siteNoData } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
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
  } = data;
  return {
    site,
    electricity: {
      currYear: electricCurrentYear,
      lastYear: electricCompareYear,
      weight: electricWeight,
      delta: electricGradient,
    },
    water: {
      currYear: waterUseCurrentYear,
      lastYear: waterUseCompareYear,
      weight: waterUseWeight,
      delta: waterUseGradient,
    },
    revenue: {
      currYear: revenueCurrentYear,
      lastYear: revenueCompareYear,
      weight: revenueWeight,
      delta: revenueGradient,
    },
    asp: {
      currYear: ASPCurrentYear,
      lastYear: ASPCompareYear,
      weight: ASPWeight,
      delta: ASPGradient,
    },
    subRows: plants.map(toRow),
    ...(site === 'Total' && { isFooter: true }),
    ...(siteNoData(data, plants) && { noData: true }),
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
    getOverviewHistory: builder.query({
      query: (query) => ({ query, url: 'overall/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ site }) => site === 'Total');
        return { data: [...records, ...total].map(toRow) };
      },
    }),
  }),
});

export const { useGetOverviewQuery, useGetOverviewHistoryQuery } = overviewApi;
