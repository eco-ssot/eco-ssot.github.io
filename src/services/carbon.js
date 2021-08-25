import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from '../axios/helpers';

export const carbonApi = createApi({
  reducerPath: 'carbonApi',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCarbon: builder.query({
      query: (query) => ({ query, url: 'carbon' }),
    }),
  }),
});

export const { useGetCarbonQuery } = carbonApi;
