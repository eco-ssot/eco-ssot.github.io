import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const managementApi = createApi({
  reducerPath: 'managementApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getGoal: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/objective` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
    }),
    getCarbonIndex: builder.query({
      query: ({ year }) => ({ url: `settings/${year}/carbonCoef` }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.sort((a, b) => a.id - b.id),
        };
      },
    }),
    patchGoal: builder.mutation({
      query: ({ year, id, data }) => ({
        data,
        url: `settings/${year}/objective/${id}`,
        method: 'PATCH',
      }),
    }),
    patchCarbonIndex: builder.mutation({
      query: ({ year, id, data }) => ({
        data,
        url: `settings/${year}/carbonCoef/${id}`,
        method: 'PATCH',
      }),
    }),
    getDataStatus: builder.query({
      query: () => ({ url: 'data-status' }),
    }),
    getDataStatusPic: builder.query({
      query: () => ({ url: 'data-status/pic' }),
    }),
  }),
});

export const {
  useGetGoalQuery,
  useGetCarbonIndexQuery,
  usePatchGoalMutation,
  usePatchCarbonIndexMutation,
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
} = managementApi;
