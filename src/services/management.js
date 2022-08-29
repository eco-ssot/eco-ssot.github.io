import { isNil, uniqBy } from 'lodash';
import qs from 'query-string';

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
      const query = {
        year: targetYear,
        category: CATEGORY_MAPPING[category],
      };

      const baseRes = await axios.get(`${baseUrl}pure/summary?${qs.stringify(query)}`);
      const baseData = baseRes?.data?.data?.sort((a, b) => b?.period_start?.localeCompare(a?.period_start));
      const maxDate = baseData[0]?.period_start;
      const filteredBaseData = baseData?.filter(
        (d) => d?.period_start === maxDate && APP_CONSTANTS.BUSINESS_MAPPING[d?.business]
      );

      const promises = filteredBaseData?.map((d) => {
        const query = { site: d?.site, plant: d?.plant };
        const baseValue = d?.ytm;
        return axios.get(`${baseUrl}settings/${year}/${d?.business}/objective?${qs.stringify(query)}`).then((res) => {
          const targetGoal = res?.data?.data?.find((_d) => _d.category === category);
          if (targetGoal) {
            const amount = isNil(baseValue)
              ? null
              : category === '可再生能源'
              ? decimal * 1e-2
              : baseValue * (1 - decimal * 1e-2);

            if (targetGoal.amount === amount && targetGoal.baseYear === baseYear) {
              return null;
            }

            return {
              amount,
              baseYear,
              target,
              id: targetGoal.id,
            };
          }

          return null;
        });
      });

      const patches = await Promise.all(promises);
      const patchPromises = uniqBy(patches.filter(Boolean), ({ id }) => id).map(({ id, ...data }) =>
        axios({ data, url: `${baseUrl}settings/${year}/objective/${id}`, method: 'PATCH' })
      );

      await Promise.all(patchPromises);
      return { data: patches };
    } catch (err) {
      return { error: err };
    }
  };

export const managementApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    getDataStatus: builder.query({
      providesTags: ['ENERGY_UPLOAD'],
      query: (query) => ({ query, url: 'data-status' }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data?.filter(({ plant }) => permission?.find((p) => plant.startsWith(p))),
        };
      },
    }),
    getDataStatusPic: builder.query({
      providesTags: ['DATA_STATUS_PIC'],
      query: (query) => ({ query, url: 'data-status/pic' }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data?.filter(({ plant }) => permission?.find((p) => plant.startsWith(p))),
        };
      },
    }),
    patchDataStatusPic: builder.mutation({
      invalidatesTags: ['DATA_STATUS_PIC'],
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
        const data = res.data?.filter(({ plant }) => permission?.find((p) => plant.startsWith(p)));
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
      query: ({ year = APP_CONSTANTS.CURRENT_YEAR, business = APP_CONSTANTS.BUSINESS_MAPPING.ALL, ...query }) => ({
        query,
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
      query: ({ category, year } = {}) => ({ query: { category, year }, url: 'pure/summary' }),
    }),
    getCarbonIndex: builder.query({
      query: ({ year = APP_CONSTANTS.CURRENT_YEAR }) => ({ url: `settings/${year}/carbonCoef` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
      providesTags: ['CARBON_INDEX'],
    }),
    getTrec: builder.query({
      query: ({ year = APP_CONSTANTS.CURRENT_YEAR }) => ({ url: `settings/${year}/rec` }),
      providesTags: ['TREC'],
    }),
    getTrecBySite: builder.query({
      query: ({ permission, year = APP_CONSTANTS.CURRENT_YEAR }) => ({
        query: { permission },
        url: `settings/${year}/rec/sites`,
      }),
      transformResponse: (res, { permission }) => {
        return {
          ...res,
          data: res.data
            ?.filter(({ plant }) => permission?.includes(plant))
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
    uploadEnergyExcel: builder.mutation({
      query: ({ data, business }) => ({
        data,
        url: /other/i.test(business) ? 'others/upload' : 'energy/upload',
        method: 'POST',
      }),
      invalidatesTags: ['ENERGY_UPLOAD'],
    }),
    postManualCsr: builder.mutation({
      query: () => ({
        url: 'data-status/upload',
        method: 'POST',
      }),
    }),
    postCopy: builder.mutation({
      query: () => ({
        url: `settings/objective/copy`,
        method: 'POST',
      }),
      invalidatesTags: ['COPY'],
    }),
    getVersion: builder.query({
      query: () => ({ url: `settings/versions` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => b.version - a.version),
        };
      },
      providesTags: ['VERSIONS'],
    }),
    postVersion: builder.mutation({
      query: ({ data }) => ({
        data,
        url: `settings/versions`,
        method: 'POST',
      }),
      invalidatesTags: ['VERSIONS'],
    }),
    deleteVersion: builder.mutation({
      query: ({ id }) => ({
        url: `settings/versions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VERSIONS'],
    }),
    patchVersion: builder.mutation({
      query: (data) => ({
        data,
        url: `settings/versions/${data.id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['VERSIONS'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetGoalQuery,
  useGetGoalBaseQuery,
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
  useUploadEnergyExcelMutation,
  usePostManualCsrMutation,
  usePostCopyMutation,
  useGetVersionQuery,
  usePostVersionMutation,
  useDeleteVersionMutation,
  usePatchVersionMutation,
} = managementApi;
