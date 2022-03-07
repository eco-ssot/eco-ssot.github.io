import { chunk, isNil } from 'lodash';

import APP_CONSTANTS from '../app/appConstants';
import axios from '../axios';
import { getDecimalNumber } from '../utils/number';

import { appApi } from './app';

const CATEGORY_MAPPING = {
  碳排放量: 'carbon_emission',
  用電強度: 'electricity_intensity',
  用水強度: 'water_intensity',
  單台用電: 'electricity_per_unit',
  廢棄物密度: 'waste_intensity',
};

const syncGoals =
  ({ baseUrl = '/' } = {}) =>
  async ({ year, baseYear, target, category } = {}) => {
    try {
      const targetYear = baseYear || Number(year) - 1;
      const decimal = getDecimalNumber(target);
      let patches = [];
      if (category === '可再生能源') {
        const promises = APP_CONSTANTS.BUSINESS_OPTIONS.map((option) =>
          axios.get(`${baseUrl}settings/${year}/${option.value}/objective`)
        );

        const responses = await Promise.all(promises);
        patches = responses.map((res) => {
          const targetGoal = res.data?.data.find((d) => d.category === category);
          if (targetGoal) {
            return { baseYear, target, id: targetGoal.id, amount: decimal * 1e-2 };
          }

          return null;
        });
      } else {
        const promises = APP_CONSTANTS.BUSINESS_OPTIONS.reduce(
          (prev, curr) =>
            prev.concat([
              axios.get(`${baseUrl}settings/${year}/${curr.value}/objective`),
              axios.get(
                `${baseUrl}pure/summary?category=${CATEGORY_MAPPING[category]}&business=${curr.value}&year=${targetYear}`
              ),
            ]),
          []
        );

        const responses = await Promise.all(promises);
        patches = chunk(responses, 2).map(([goalRes, baseRes]) => {
          const targetGoal = (goalRes.data?.data || []).find((d) => d.category === category);
          const baseValue = (baseRes.data?.data || [])
            .sort((a, b) => a.period_start.localeCompare(b.period_start))
            .slice(-1)[0]?.ytm;

          if (targetGoal) {
            return {
              baseYear,
              target,
              id: targetGoal.id,
              amount: isNil(baseValue) ? null : baseValue * (1 - decimal * 1e-2),
            };
          }

          return null;
        });
      }

      const patchPromises = patches
        .filter(Boolean)
        .map(({ id, ...data }) => axios({ data, url: `${baseUrl}settings/${year}/objective/${id}`, method: 'PATCH' }));

      await Promise.all(patchPromises);
      return { data: patches };
    } catch (err) {
      return { error: err };
    }
  };

export const managementApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDataStatus: builder.query({
      query: (query) => ({ query, url: 'data-status' }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data?.filter(({ plant }) => permission.plant?.find((p) => plant.startsWith(p))),
        };
      },
    }),
    getDataStatusPic: builder.query({
      query: (query) => ({ query, url: 'data-status/pic' }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data?.filter(({ plant }) => permission.plant?.find((p) => plant.startsWith(p))),
        };
      },
    }),
    patchDataStatusPic: builder.mutation({
      query: ({ plant, ...data }) => ({
        data,
        url: `data-status/pic/${plant}`,
        method: 'PATCH',
      }),
    }),
    getPlantOptions: builder.query({
      query: (query) => ({ query, url: 'plants' }),
      transformResponse: (res) =>
        res?.data
          ?.map((plant) => ({
            key: plant,
            value: plant,
          }))
          ?.sort((a, b) => a.key.localeCompare(b.key)),
    }),
    getCsrStatus: builder.query({
      providesTags: ['CSR'],
      query: (query) => ({ query, url: 'data-status/csr-compare' }),
      transformResponse: (res, { permission }) => {
        const data = res.data?.filter(({ plant }) => permission.plant?.find((p) => plant.startsWith(p)));
        return {
          ...res,
          electricity: data?.map(({ plant, electric, water }) => ({
            plant,
            electric_comment: electric.comment,
            water_comment: water.comment,
            ...electric,
          })),
          water: data?.map(({ plant, electric, water }) => ({
            plant,
            electric_comment: electric.comment,
            water_comment: water.comment,
            ...water,
          })),
        };
      },
    }),
    postCsrComment: builder.mutation({
      invalidatesTags: ['CSR'],
      query: ({ plant, ...data }) => ({
        data,
        url: `data-status/csr-compare/${plant}`,
        method: 'PATCH',
      }),
    }),
    getGoal: builder.query({
      query: ({ year, business = APP_CONSTANTS.BUSINESS_MAPPING.ALL }) => ({
        url: `settings/${year}/${business}/objective`,
      }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
      providesTags: ['YEAR_GOAL'],
    }),
    getGoalBase: builder.query({
      query: (query) => ({ query, url: 'pure/summary' }),
    }),
    getCarbonIndex: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/carbonCoef` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
      providesTags: ['CARBON_INDEX'],
    }),
    getTrec: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/rec` }),
      providesTags: ['TREC'],
    }),
    getTrecBySite: builder.query({
      query: ({ year, permission }) => ({ query: { permission }, url: `settings/${year}/rec/sites` }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data
            ?.filter(({ plant }) => permission.plant?.includes(plant))
            ?.map(({ plant, ...rest }) => ({ plant, id: plant, ...rest })),
        };
      },
      providesTags: ['TREC_BY_SITE'],
    }),
    patchGoal: builder.mutation({
      queryFn: (query) => {
        return syncGoals()(query);
      },
      invalidatesTags: ['YEAR_GOAL'],
    }),
    patchCarbonIndex: builder.mutation({
      query: ({ year, id, data }) => ({
        data,
        url: `settings/${year}/carbonCoef/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['CARBON_INDEX'],
    }),
    patchTrec: builder.mutation({
      query: ({ year, id, data }) => ({
        data,
        url: `settings/${year}/rec/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['TREC'],
    }),
    deleteTrec: builder.mutation({
      query: ({ year, id }) => ({
        url: `settings/${year}/rec/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TREC'],
    }),
    patchTrecBySite: builder.mutation({
      query: ({ year, plant, data }) => ({
        data,
        url: `settings/${year}/rec/sites/${plant}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['TREC_BY_SITE'],
    }),
    deleteTrecBySite: builder.mutation({
      query: ({ year, plant }) => ({
        url: `settings/${year}/rec/sites/${plant}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TREC_BY_SITE'],
    }),
    postTrec: builder.mutation({
      query: ({ year, data }) => ({
        data,
        url: `settings/${year}/rec`,
        method: 'POST',
      }),
      invalidatesTags: ['TREC'],
    }),
    postTrecBySite: builder.mutation({
      query: ({ year, data }) => ({
        data,
        url: `settings/${year}/rec/sites`,
        method: 'POST',
      }),
      invalidatesTags: ['TREC_BY_SITE'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  useGetTrecQuery,
  useGetTrecBySiteQuery,
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
  useGetPlantOptionsQuery,
  useGetCsrStatusQuery,
  usePatchDataStatusPicMutation,
  usePostCsrCommentMutation,
  usePatchGoalMutation,
  usePatchCarbonIndexMutation,
  usePatchTrecMutation,
  usePatchTrecBySiteMutation,
  usePostTrecMutation,
  usePostTrecBySiteMutation,
  useDeleteTrecMutation,
  useDeleteTrecBySiteMutation,
} = managementApi;
