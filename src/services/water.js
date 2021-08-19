import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const waterApi = createApi({
  reducerPath: 'waterApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWaterApi: builder.query({
      query: (query) => ({ query, url: 'water' }),
    }),
  }),
});

export const { useGetWaterApiQuery } = waterApi;
