import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const singleElectricApi = createApi({
  reducerPath: 'singleElectricApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getSingleElectricApi: builder.query({
      query: (query) => ({ query, url: 'singleelectric' }),
    }),
  }),
});

export const { useGetSingleElectricApiQuery } = singleElectricApi;
