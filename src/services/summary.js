import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const summaryApi = createApi({
  reducerPath: 'summaryApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (query) => ({ query, url: 'summary' }),
    }),
  }),
});

export const { useGetSummaryQuery } = summaryApi;
