import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const unitElectricityApi = createApi({
  reducerPath: 'unitElectricityApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUnitElectricityApi: builder.query({
      query: (query) => ({ query, url: 'singleelectric' }),
    }),
  }),
});

export const { useGetUnitElectricityApiQuery } = unitElectricityApi;
