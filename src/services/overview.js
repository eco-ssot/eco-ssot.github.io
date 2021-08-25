import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const overviewApi = createApi({
  reducerPath: 'overviewApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getOverview: builder.query({
      query: (query) => ({ query, url: 'overall' }),
    }),
  }),
});

export const { useGetOverviewQuery } = overviewApi;
