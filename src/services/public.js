import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const publicApi = createApi({
  reducerPath: 'publicApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    getVersion: builder.query({
      query: () => ({ url: '/version.json' }),
    }),
  }),
});

export const { useGetVersionQuery } = publicApi;
