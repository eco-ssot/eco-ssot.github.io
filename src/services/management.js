import { createApi } from '@reduxjs/toolkit/query/react';
import { uniq } from 'lodash';

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
      query: () => ({ url: 'data-status' }),
      transformResponse: (res) =>
        uniq(
          res?.data?.map(({ plant }) => {
            const p = plant.split('(')[0].trim();
            return {
              key: p,
              value: p,
            };
          })
        ),
    }),
  }),
});

export const {
  useGetDataStatusQuery,
  useGetDataStatusPicQuery,
  useGetPlantOptionsQuery,
  usePatchDataStatusPicMutation,
} = managementApi;
