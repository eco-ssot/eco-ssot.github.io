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
  }),
});

export const { useGetDataStatusQuery, useGetDataStatusPicQuery, usePatchDataStatusPicMutation } = managementApi;
