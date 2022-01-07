import { createApi } from '@reduxjs/toolkit/query/react';

import APP_CONFIG from '../constants/app-config';

import { axiosBaseQuery } from './helpers';

export const managementApi = createApi({
  reducerPath: 'managementApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDataStatus: builder.query({
      query: () => ({ url: 'data-status' }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.filter(({ plant }) => !APP_CONFIG.HIDE_PLANTS.some((val) => String(plant).startsWith(val))),
        };
      },
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
      query: (query) => ({ query, url: 'data-status/csr-compare' }),
      transformResponse: (res) => {
        return {
          ...res,
          data: res.data.filter(({ plant }) => !APP_CONFIG.HIDE_PLANTS.some((val) => String(plant).startsWith(val))),
        };
      },
    }),
  }),
});

export const {
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
  useGetPlantOptionsQuery,
  useGetCsrStatusQuery,
  usePatchDataStatusPicMutation,
} = managementApi;
