import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const summaryApi = createApi({
  reducerPath: 'summaryApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSummaryApi: builder.query({
      query: (query) => ({ query, url: 'summary' }),
    }),
  }),
});

export const { useGetSummaryApiQuery } = summaryApi;
