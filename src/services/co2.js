import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const co2Api = createApi({
  reducerPath: 'co2Api',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCo2Api: builder.query({
      query: (query) => ({ query, url: 'co2' }),
    }),
  }),
});

export const { useGetCo2ApiQuery } = co2Api;
