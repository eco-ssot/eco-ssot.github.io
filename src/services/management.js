import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const managementApi = createApi({
  reducerPath: 'managementApi',
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
  }),
});

export const {
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
  useGetPlantOptionsQuery,
  usePatchDataStatusPicMutation,
} = managementApi;
