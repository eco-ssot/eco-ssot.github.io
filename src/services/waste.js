import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData, sortExplanationsById } from './helpers';

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

export function toDetailRow({ plants = [], ...data } = {}) {
  const {
    currentKitchenWaste,
    currentManpower,
    currentNormal,
    currentProdQty,
    currentRecyclPrd,
    currentRecyclableHazardous,
    gradientKitchenWaste,
    gradientManpower,
    gradientNormal,
    gradientProdQty,
    gradientRecyclPrd,
    gradientRecyclableHazardous,
    lastManpower,
    lastNormal,
    lasttKitchenWaste,
    lasttProdQty,
    lasttRecyclPrd,
    lasttRecyclableHazardous,
    site,
  } = data;

  return {
    site,
    normal: {
      lastYear: lastNormal,
      currYear: currentNormal,
      ratio: gradientNormal,
    },
    manpower: {
      lastYear: lastManpower,
      currYear: currentManpower,
      ratio: gradientManpower,
    },
    wastePerPerson: {
      lastYear: lasttKitchenWaste,
      currYear: currentKitchenWaste,
      ratio: gradientKitchenWaste,
    },
    recycle: {
      lastYear: lasttRecyclableHazardous,
      currYear: currentRecyclableHazardous,
      ratio: gradientRecyclableHazardous,
    },
    production: {
      lastYear: lasttProdQty,
      currYear: currentProdQty,
      ratio: gradientProdQty,
    },
    asp: {
      lastYear: lasttRecyclPrd,
      currYear: currentRecyclPrd,
      ratio: gradientRecyclPrd,
    },
    subRows: plants.map(toDetailRow),
    ...(site === 'Total' && { isFooter: true }),
  };
}

export const wasteApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getWaste: builder.query({
      query: (query) => ({ query, url: 'waste' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission);
        const [total, records] = partition(data, ({ site }) => site === 'Total');
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
      providesTags: ['WASTE_UPLOAD'],
    }),
    getWasteDetail: builder.query({
      query: (query) => ({ query, url: 'waste-others' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(
          res.data?.map((d) => (d.plants ? { ...d, plants: d.plants.map((_d) => ({ ..._d, site: _d.plant })) } : d)),
          permission
        );

        const [total, records] = partition(data, ({ site }) => site === 'Total');
        const maxDate = getMaxDate(
          ...data.reduce(
            (prev, { latestDate, plants = [] }) => prev.concat(latestDate).concat(plants.map((p) => p.latestDate)),
            []
          )
        );

        return {
          maxDate,
          data: [...records, ...total].map(toDetailRow),
        };
      },
      providesTags: ['WASTE_UPLOAD'],
    }),
    getWasteHistory: builder.query({
      query: (query) => ({ query, url: 'waste/history' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getWasteAnalysis: builder.query({
      query: (query) => ({ query, url: 'waste/anaysis' }),
    }),
    getWasteExplanation: builder.query({
      query: (query) => ({ query, url: 'waste/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['WASTE_EXPLANATION'],
    }),
    postWasteExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'waste/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    postWasteImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `waste/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    patchWasteExplanation: builder.mutation({
      query: ({ id, data }) => ({ data, url: `waste/anaysis/explanation/${id}`, method: 'PATCH' }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    patchWasteImprovement: builder.mutation({
      query: ({ id, subId, data }) => ({
        data,
        url: `waste/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    deleteWasteExplanation: builder.mutation({
      query: ({ id }) => ({ url: `waste/anaysis/explanation/${id}`, method: 'DELETE' }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    deleteWasteImprovement: builder.mutation({
      query: ({ id, subId }) => ({
        url: `waste/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WASTE_EXPLANATION'],
    }),
    uploadWasteExcel: builder.mutation({
      query: (formData) => ({
        url: 'waste/upload',
        method: 'POST',
        data: formData,
      }),
      invalidatesTags: ['WASTE_UPLOAD'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWasteQuery,
  useGetWasteDetailQuery,
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
