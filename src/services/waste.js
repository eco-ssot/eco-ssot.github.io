import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const wasteApi = createApi({
  reducerPath: 'wasteApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWasteApi: builder.query({
      query: (q) => ({ q, url: 'waste' }),
    }),
  }),
});

export const { useGetWasteApiQuery } = wasteApi;
