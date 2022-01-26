import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const managementApi = createApi({
  reducerPath: 'managementApi',
  tagTypes: ['CSR'],
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDataStatus: builder.query({
      query: () => ({ url: 'data-status' }),
    }),
    getDataStatusPic: builder.query({
      query: () => ({ url: 'data-status/pic' }),
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
        res?.data?.map((plant) => ({
          key: plant,
          value: plant,
        })),
    }),
    getCsrStatus: builder.query({
      providesTags: ['CSR'],
      query: (query) => ({ query, url: 'data-status/csr-compare' }),
      transformResponse: (res) => {
        return {
          ...res,
          electricity: res.data.map(({ plant, electric, water }) => ({
            plant,
            electric_comment: electric.comment,
            water_comment: water.comment,
            ...electric,
          })),
          water: res.data.map(({ plant, electric, water }) => ({
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
  }),
});

export const {
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
  useGetPlantOptionsQuery,
  useGetCsrStatusQuery,
  usePatchDataStatusPicMutation,
  usePostCsrCommentMutation,
} = managementApi;
