import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const overallApi = createApi({
  reducerPath: 'overallApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOverallApi: builder.query({
      query: (query) => ({ query, url: 'overall' }),
    }),
  }),
});

export const { useGetOverallApiQuery } = overallApi;
