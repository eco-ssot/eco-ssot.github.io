import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const wasteApi = createApi({
  reducerPath: 'wasteApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getWasteApi: builder.query({
      query: (query) => ({ query, url: 'waste' }),
    }),
  }),
});

export const { useGetWasteApiQuery } = wasteApi;
