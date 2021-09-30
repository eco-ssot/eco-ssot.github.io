import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery, sortExplanationsById } from './helpers';

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
  tagTypes: ['EXPLANATION'],
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
    getWaterHistory: builder.query({
      query: (query) => ({ query, url: 'water/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getWaterAnalysis: builder.query({
      query: (query) => ({ query, url: 'water/anaysis' }),
    }),
    getWaterExplanation: builder.query({
      query: (query) => ({ query, url: 'water/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['EXPLANATION'],
    }),
    postWaterExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'water/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    postWaterImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `water/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    patchWaterExplanation: builder.mutation({
      query: ({ id, data }) => ({ data, url: `water/anaysis/explanation/${id}`, method: 'PATCH' }),
    }),
    patchWaterImprovement: builder.mutation({
      query: ({ id, subId, data }) => ({
        data,
        url: `water/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useGetWaterQuery,
  useGetWaterHistoryQuery,
  useGetWaterAnalysisQuery,
  useGetWaterExplanationQuery,
  usePatchWaterExplanationMutation,
  usePatchWaterImprovementMutation,
  usePostWaterExplanationMutation,
  usePostWaterImprovementMutation,
} = waterApi;
