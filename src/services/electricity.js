import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const electricityApi = createApi({
  reducerPath: 'electricityApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getElectricityApi: builder.query({
      query: (query) => ({ query, url: 'electric' }),
    }),
  }),
});

export const { useGetElectricityApiQuery } = electricityApi;
