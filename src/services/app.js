import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const appApi = createApi({
  reducerPath: 'appApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['YEAR_GOAL', 'CARBON_INDEX'],
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (query) => ({ query, url: 'summary' }),
      providesTags: ['YEAR_GOAL', 'CARBON_INDEX'],
    }),
    getGoal: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/objective` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
      providesTags: ['YEAR_GOAL'],
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
    patchGoal: builder.mutation({
      query: ({ year, id, data }) => ({
        data,
        url: `settings/${year}/objective/${id}`,
        method: 'PATCH',
      }),
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
  }),
});

export const {
  useGetSummaryQuery,
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  usePatchGoalMutation,
  usePatchCarbonIndexMutation,
} = appApi;
