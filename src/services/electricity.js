import { createApi } from '@reduxjs/toolkit/query/react';
import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { axiosBaseQuery, sortExplanationsById } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
    name,
    electricCompareYear,
    electricCurrentYear,
    electricGradient,
    revenueCompareYear,
    revenueCurrentYear,
    revenueGradient,
    billiRevenueElectricCompareYear,
    billiRevenueElectricCurrentYear,
    billiRevenueElectricGradient,
    ASPCompareYear,
    ASPCurrentYear,
    ASPGradientYear,
  } = data;
  return {
    site: name,
    electricity: {
      currYear: electricCurrentYear,
      lastYear: electricCompareYear,
      delta: electricGradient,
    },
    revenue: {
      currYear: revenueCurrentYear,
      lastYear: revenueCompareYear,
      delta: revenueGradient,
    },
    revenueElectricity: {
      currYear: billiRevenueElectricCurrentYear,
      lastYear: billiRevenueElectricCompareYear,
      delta: billiRevenueElectricGradient,
    },
    asp: {
      currYear: ASPCurrentYear,
      lastYear: ASPCompareYear,
      delta: ASPGradientYear,
    },
    subRows: plants.map(toRow),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const electricityApi = createApi({
  reducerPath: 'electricityApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['EXPLANATION'],
  endpoints: (builder) => ({
    getElectricity: builder.query({
      query: (query) => ({ query, url: 'electric' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...res.data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return {
          maxDate,
          data: [...records, ...total].map(toRow),
        };
      },
    }),
    getElectricityHistory: builder.query({
      query: (query) => ({ query, url: 'electric/history' }),
      transformResponse: (res) => {
        const [total, records] = partition(res.data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getElectricityAnalysis: builder.query({
      query: (query) => ({ query, url: 'electric/anaysis' }),
    }),
    getElectricityExplanation: builder.query({
      query: (query) => ({ query, url: 'electric/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['EXPLANATION'],
    }),
    getElectricityPrediction: builder.query({
      query: (query) => ({ query, url: 'electric/inference/prediction' }),
    }),
    getElectricityBaseline: builder.query({
      query: (query) => ({ query, url: 'electric/inference/baseline' }),
    }),
    postElectricityExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'electric/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    postElectricityImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `electric/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    patchElectricityExplanation: builder.mutation({
      query: ({ id, data }) => ({ data, url: `electric/anaysis/explanation/${id}`, method: 'PATCH' }),
    }),
    patchElectricityImprovement: builder.mutation({
      query: ({ id, subId, data }) => ({
        data,
        url: `electric/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'PATCH',
      }),
    }),
    deleteElectricityExplanation: builder.mutation({
      query: ({ id }) => ({ url: `electric/anaysis/explanation/${id}`, method: 'DELETE' }),
      invalidatesTags: ['EXPLANATION'],
    }),
    deleteElectricityImprovement: builder.mutation({
      query: ({ id, subId }) => ({
        url: `electric/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['EXPLANATION'],
    }),
  }),
});

export const {
  useGetElectricityQuery,
  useGetElectricityHistoryQuery,
  useGetElectricityAnalysisQuery,
  useGetElectricityExplanationQuery,
  useGetElectricityPredictionQuery,
  useGetElectricityBaselineQuery,
  usePatchElectricityExplanationMutation,
  usePatchElectricityImprovementMutation,
  usePostElectricityExplanationMutation,
  usePostElectricityImprovementMutation,
  useDeleteElectricityExplanationMutation,
  useDeleteElectricityImprovementMutation,
} = electricityApi;
