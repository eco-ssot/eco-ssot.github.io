import { createApi } from '@reduxjs/toolkit/query/react';
import { chunk, isNil } from 'lodash';

import APP_CONSTANTS from '../app/appConstants';
import { setDateInfo } from '../app/appSlice';
import axios from '../axios';
import { getMaxDate } from '../utils/date';
import { getDecimalNumber } from '../utils/number';

import { axiosBaseQuery } from './helpers';

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

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['YEAR_GOAL', 'CARBON_INDEX', 'TREC', 'TREC_BY_SITE'],
  endpoints: (builder) => ({
    getSummary: builder.query({
      providesTags: ['YEAR_GOAL', 'CARBON_INDEX'],
      queryFn: (query, { dispatch, getState }) => {
        return axiosBaseQuery()({ query, url: 'summary' }).then((res) => {
          const latestDate = getMaxDate(
            res.data.revenue?.latestDate,
            res.data.electricPowerUtilization?.latestDate,
            res.data.CO2Emission?.latestDate,
            res.data.waterUse?.latestDate,
            res.data.waste?.latestDate
          );

          const ld = new Date(latestDate);
          const currYear = ld.getFullYear();
          const lastYear = currYear - 1;
          const currMonth = ld.getMonth() + 1;
          const yearOptions = APP_CONSTANTS.YEAR_OPTIONS.filter((option) => Number(option.key) <= currYear);
          dispatch(
            setDateInfo({
              latestDate,
              yearOptions,
              currYear: String(currYear),
              lastYear: String(lastYear),
              currMonth: String(currMonth),
              ...(!query && {
                yOptions: yearOptions,
                latestMonth: String(currMonth),
                latestYear: String(currYear),
              }),
            })
          );

          return {
            data: {
              ...res.data,
              latestDate,
              yearOptions,
              currYear: String(currYear),
              lastYear: String(lastYear),
              currMonth: String(currMonth),
            },
          };
        });
      },
    }),
    getMissingPlants: builder.query({
      queryFn: (query) => {
        return axiosBaseQuery()({ query, url: 'summary' }).then((res) => {
          console.log({ res });
          return {
            data: query.year && query.year < 2022 ? [] : res.data.missing,
          };
        });
      },
    }),
    getLatestDate: builder.query({
      query: (query) => ({ query, url: 'summary' }),
      transformResponse: (res) => {
        const latestDate = getMaxDate(
          res.revenue?.latestDate,
          res.electricPowerUtilization?.latestDate,
          res.CO2Emission?.latestDate,
          res.waterUse?.latestDate,
          res.waste?.latestDate
        );

        const ld = new Date(latestDate);
        const currYear = ld.getFullYear();
        const lastYear = currYear - 1;
        const currMonth = ld.getMonth() + 1;
        const yearOptions = APP_CONSTANTS.YEAR_OPTIONS.filter((option) => Number(option.key) <= currYear);
        return {
          latestDate,
          yearOptions,
          currYear: String(currYear),
          lastYear: String(lastYear),
          currMonth: String(currMonth),
        };
      },
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
      query: ({ year }) => ({ url: `settings/${year}/rec/sites` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data?.map(({ plant, ...rest }) => ({ plant, id: plant, ...rest })),
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
});

export const {
  useGetSummaryQuery,
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  useGetTrecQuery,
  useGetTrecBySiteQuery,
  useGetMissingPlantsQuery,
  useGetLatestDateQuery,
  usePatchGoalMutation,
  usePatchCarbonIndexMutation,
  usePatchTrecMutation,
  usePatchTrecBySiteMutation,
  usePostTrecMutation,
  usePostTrecBySiteMutation,
  useDeleteTrecMutation,
  useDeleteTrecBySiteMutation,
} = appApi;
