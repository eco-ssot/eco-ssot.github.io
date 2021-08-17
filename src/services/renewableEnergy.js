import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './helpers';

export const renewableEnergyApi = createApi({
  reducerPath: 'renewableEnergyApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getRenewableEnergyApi: builder.query({
      query: (query) => ({ query, url: 'renewableenergy' }),
    }),
  }),
});

export const { useGetRenewableEnergyApiQuery } = renewableEnergyApi;
