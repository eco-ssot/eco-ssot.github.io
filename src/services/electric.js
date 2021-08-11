import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const electricApi = createApi({
  reducerPath: 'electricApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getElectricApi: builder.query({
      query: (q) => ({ q, url: 'electric' }),
    }),
  }),
});

export const { useGetElectricApiQuery } = electricApi;
