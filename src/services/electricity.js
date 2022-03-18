import { partition } from 'lodash';

import APP_CONSTANTS from '../app/appConstants';
import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData, sortExplanationsById } from './helpers';

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

export const electricityApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getElectricity: builder.query({
      query: (query) => ({ query, url: 'electric' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        const maxDate = getMaxDate(
          ...data.reduce(
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
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getElectricityAnalysis: builder.query({
      query: (query) => ({ query, url: 'electric/anaysis' }),
    }),
    getElectricityExplanation: builder.query({
      query: (query) => ({ query, url: 'electric/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['ELECTRICITY_EXPLANATION'],
    }),
    getElectricityPrediction: builder.query({
      query: (query) => ({ query, url: 'electric/inference/prediction' }),
    }),
    getElectricityBaseline: builder.query({
      query: (query) => ({ query, url: 'electric/inference/baseline' }),
    }),
    getElectricityPowerSaving: builder.query({
      query: ({ year, plant } = {}) => ({ url: `electric/inference/saving-tech/${year}/${plant}` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data?.map((d, i) => ({
            ...d,
            id: i,
            category: APP_CONSTANTS.ELECTRICITY_TYPE_MAPPING[d.category] || d.category,
          })),
        };
      },
      providesTags: ['POWER_SAVING'],
    }),
    postElectricityExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'electric/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['ELECTRICITY_EXPLANATION'],
    }),
    postElectricityImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `electric/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['ELECTRICITY_EXPLANATION', 'POWER_SAVING'],
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
      invalidatesTags: ['POWER_SAVING'],
    }),
    deleteElectricityExplanation: builder.mutation({
      query: ({ id }) => ({ url: `electric/anaysis/explanation/${id}`, method: 'DELETE' }),
      invalidatesTags: ['ELECTRICITY_EXPLANATION', 'POWER_SAVING'],
    }),
    deleteElectricityImprovement: builder.mutation({
      query: ({ id, subId }) => ({
        url: `electric/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ELECTRICITY_EXPLANATION', 'POWER_SAVING'],
    }),
    postElectricityPowerSavingMutation: builder.mutation({
      query: ({ year, plant, data } = {}) => ({
        data,
        url: `electric/inference/saving-tech/${year}/${plant}`,
        method: 'POST',
      }),
      invalidatesTags: ['POWER_SAVING'],
    }),
    patchElectricityPowerSavingMutation: builder.mutation({
      query: ({ year, plant, data } = {}) => ({
        data,
        url: `electric/inference/saving-tech/${year}/${plant}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['POWER_SAVING'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetElectricityQuery,
  useGetElectricityHistoryQuery,
  useGetElectricityAnalysisQuery,
  useGetElectricityExplanationQuery,
  useGetElectricityPredictionQuery,
  useGetElectricityBaselineQuery,
  useGetElectricityPowerSavingQuery,
  usePatchElectricityExplanationMutation,
  usePatchElectricityImprovementMutation,
  usePostElectricityExplanationMutation,
  usePostElectricityImprovementMutation,
  usePostElectricityPowerSavingMutationMutation,
  usePatchElectricityPowerSavingMutationMutation,
  useDeleteElectricityExplanationMutation,
  useDeleteElectricityImprovementMutation,
} = electricityApi;
