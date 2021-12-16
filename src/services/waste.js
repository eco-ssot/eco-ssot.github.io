import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery, sortExplanationsById } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
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
  } = data;
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
  tagTypes: ['EXPLANATION'],
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
    getWasteHistory: builder.query({
      query: (query) => ({ query, url: 'waste/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getWasteAnalysis: builder.query({
      query: (query) => ({ query, url: 'waste/anaysis' }),
    }),
    getWasteExplanation: builder.query({
      query: (query) => ({ query, url: 'waste/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['EXPLANATION'],
    }),
    postWasteExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'waste/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    postWasteImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `waste/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    patchWasteExplanation: builder.mutation({
      query: ({ id, data }) => ({ data, url: `waste/anaysis/explanation/${id}`, method: 'PATCH' }),
    }),
    patchWasteImprovement: builder.mutation({
      query: ({ id, subId, data }) => ({
        data,
        url: `waste/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'PATCH',
      }),
    }),
    deleteWasteExplanation: builder.mutation({
      query: ({ id }) => ({ url: `waste/anaysis/explanation/${id}`, method: 'DELETE' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    deleteWasteImprovement: builder.mutation({
      query: ({ id, subId }) => ({
        url: `waste/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EXPLANATION'],
    }),
    uploadWasteExcel: builder.mutation({
      query: (formData) => ({
        url: 'waste/upload',
        method: 'POST',
        data: formData,
      }),
    }),
  }),
});

export const {
  useGetWasteQuery,
  useGetWasteHistoryQuery,
  useGetWasteAnalysisQuery,
  useGetWasteExplanationQuery,
  usePostWasteExplanationMutation,
  usePostWasteImprovementMutation,
  usePatchWasteExplanationMutation,
  usePatchWasteImprovementMutation,
  useDeleteWasteExplanationMutation,
  useDeleteWasteImprovementMutation,
  useUploadWasteExcelMutation,
} = wasteApi;
