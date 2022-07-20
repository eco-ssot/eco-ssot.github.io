import { partition } from 'lodash';

import { getMaxDate } from '../utils/date';

import { appApi } from './app';
import { getPlantData, sortExplanationsById } from './helpers';

export function toRow({ plants = [], ...data } = {}) {
  const {
    name,
    waterCompareYear,
    waterCurrentYear,
    waterWeight,
    waterGradient,
    manpowerCompareYear,
    manpowerCurrentYear,
    water_manpowerCompareYear,
    water_manpowerCurrentYear,
    water_manpowerWeight,
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
  } = data;
  return {
    site: name,
    water: {
      currYear: waterCurrentYear,
      lastYear: waterCompareYear,
      weight: waterWeight,
      delta: waterGradient,
    },
    manpower: {
      currYear: manpowerCurrentYear,
      lastYear: manpowerCompareYear,
    },
    waterAvg: {
      currYear: water_manpowerCurrentYear,
      lastYear: water_manpowerCompareYear,
      delta: water_manpowerWeight,
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
    subRows: plants.map((plant) => ({ ...toRow(plant), parentSite: name })),
    ...(name === 'Total' && { isFooter: true }),
  };
}

export const waterApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getWater: builder.query({
      query: (query) => ({ query, url: 'water' }),
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
    getWaterManpowerAsync: builder.query({
      query: (query) => ({ query, url: 'manpower-water' }),
      transformResponse: (res, { query }) => {
        const data = query.plant ? res.data?.[0]?.plants?.find((d) => d.plant === query.plant) : res.data?.[0];
        const nextData = [
          {
            site: '廠區',
            water: {
              currYear: data?.plant_region?.currentWater,
              lastYear: data?.plant_region?.lastWater,
            },
            manpower: {
              currYear: data?.plant_region?.currentManpower,
              lastYear: data?.plant_region?.lastManpower,
            },
            waterAvg: {
              currYear: data?.plant_region?.currentWater / data?.plant_region?.currentManpower,
              lastYear: data?.plant_region?.lastWater / data?.plant_region?.lastManpower,
            },
            rowSpan: {
              'manpower.currYear': 0,
              'manpower.lastYear': 0,
              'manpower.delta': 0,
            },
          },
          {
            site: '宿舍',
            water: {
              currYear: data?.dormitory?.currentWater,
              lastYear: data?.dormitory?.lastWater,
            },
            manpower: {
              currYear: data?.dormitory?.currentManpower,
              lastYear: data?.dormitory?.lastManpower,
            },
            waterAvg: {
              currYear: data?.dormitory?.currentWater / data?.dormitory?.currentManpower,
              lastYear: data?.dormitory?.lastWater / data?.dormitory?.lastManpower,
            },
          },
        ];

        return { ...res, data: nextData, site: data?.site || data?.plant };
      },
    }),
    getWaterHistory: builder.query({
      query: (query) => ({ query, url: 'water/history' }),
      transformResponse: (res, { permission }) => {
        const data = getPlantData(res.data, permission, 'name');
        const [total, records] = partition(data, ({ name }) => name === 'Total');
        return { data: [...records, ...total] };
      },
    }),
    getWaterAnalysis: builder.query({
      query: (query) => ({ query, url: 'water/anaysis' }),
    }),
    getWaterExplanation: builder.query({
      query: (query) => ({ query, url: 'water/anaysis/explanation' }),
      transformResponse: sortExplanationsById,
      providesTags: ['WATER_EXPLANATION'],
    }),
    postWaterExplanation: builder.mutation({
      query: ({ data }) => ({ data, url: 'water/anaysis/explanation', method: 'POST' }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
    postWaterImprovement: builder.mutation({
      query: ({ id, data }) => ({ data, url: `water/anaysis/explanation/${id}/improvements`, method: 'POST' }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
    patchWaterExplanation: builder.mutation({
      query: ({ id, data }) => ({ data, url: `water/anaysis/explanation/${id}`, method: 'PATCH' }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
    patchWaterImprovement: builder.mutation({
      query: ({ id, subId, data }) => ({
        data,
        url: `water/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
    deleteWaterExplanation: builder.mutation({
      query: ({ id }) => ({ url: `water/anaysis/explanation/${id}`, method: 'DELETE' }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
    deleteWaterImprovement: builder.mutation({
      query: ({ id, subId }) => ({
        url: `water/anaysis/explanation/${id}/improvements/${subId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['WATER_EXPLANATION'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWaterQuery,
  useGetWaterHistoryQuery,
  useGetWaterAnalysisQuery,
  useGetWaterExplanationQuery,
  useLazyGetWaterManpowerAsyncQuery,
  usePatchWaterExplanationMutation,
  usePatchWaterImprovementMutation,
  usePostWaterExplanationMutation,
  usePostWaterImprovementMutation,
  useDeleteWaterExplanationMutation,
  useDeleteWaterImprovementMutation,
} = waterApi;
