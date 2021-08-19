import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const carbonApi = createApi({
  reducerPath: 'carbonApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCarbonApi: builder.query({
      query: (query) => ({ query, url: 'co2' }),
    }),
  }),
});

export const { useGetCarbonApiQuery } = carbonApi;
